import {ref, reactive, computed, toRaw} from 'vue'
import {showMsg} from "@/composables/utill.js";

/**
 * 테이블 테이터를 공용으로 사용
 */
export function useInitTable(opt={}){
     //검색부분
     let searchForm = null;
     let resetSearchForm = null;
     if(opt.defaultSearchForm){
         searchForm = reactive({...opt.defaultSearchForm});
         resetSearchForm = ()=>{
             for(let key in opt.defaultSearchForm){
                 searchForm[key] = opt.defaultSearchForm[key];
             }
             getData();
         }
     }

     //페이지 처리
     const currentPage = ref(1);
     const limit = ref(opt.limit ? opt.limit : 10);
     const total = ref(0);

     //데이터부분
     const dataList = ref([]);
     const loading = ref(false);

    /**
     * 데이터 리스트 갖고오기
     */
    const getData = (page=null)=>{
        if (page && typeof page === 'number'){
            currentPage.value = page;
        }
        loading.value = true;
        opt.getList(currentPage.value,limit.value,searchForm).then((res)=>{
            if(opt.afterDataList && typeof opt.afterDataList === 'function'){
                opt.afterDataList(res);
            }else{
                dataList.value = res.list;
                total.value = res.total;
            }
        }).finally(()=>{
            loading.value = false;
        });

    }

    /**
     * 멀티아이디 갖고오는 함수
     */
    const multiSelectionIds = ref([])
    const handleSelectionChange = (e) => {
        multiSelectionIds.value = e.map(o => o.id)
    }
    const multipleTableRef = ref(null)
    /**
     * 데이터 삭제
     */
    const handleDelete = (id)=>{
        loading.value = true;
        opt.delete(id).then((res)=>{
            showMsg("删除成功");
            if(opt.deleteCheck && typeof opt.deleteCheck === 'function'){
                opt.deleteCheck();
            }
            getData();
        }).finally(()=>{
            loading.value = false;
        })
    }

    /**
     * 데이터 멀티 삭제
     */
    const handleDeleteAll=()=>{
        loading.value = true;
        if(multiSelectionIds.value.length == 0){
            showMsg("请选择删除项",'error');
            loading.value = false;
            return false;
        }
        opt.deleteAll(multiSelectionIds.value).then((res)=>{
            showMsg("选择项删除成功");
            if(opt.deleteAllCheck && typeof opt.deleteAllCheck === 'function'){
                opt.deleteAllCheck();
            }
            // 清空选中
            if (multipleTableRef.value) {
                multipleTableRef.value.clearSelection()
            }
            getData()
        }).finally(()=>{
            loading.value = false;
        })
    }


    /**
     * 데이터 상태변화
     */
    const handleStatusChange = (status,item)=>{
            item.statusLoding = true;
        opt.updateStatus(item.id,status).then((res)=>{
            showMsg("状态修改成功");
            item.status = status;
        }).finally(()=>{
            item.statusLoding = false;
        })
    }

    /**
     * 데이터 멀티상태변환
     */
    const handleStatusChangeAll = (status)=>{
        if(multiSelectionIds.value.length == 0){
            showMsg("请选择状态修项",'error');
            loading.value = false;
            return;
        }
        opt.updateStatusAll(multiSelectionIds.value,status).then((res)=>{
            showMsg("选择项状态修改成功");
            // 清空选中
            if (multipleTableRef.value) {
                multipleTableRef.value.clearSelection()
            }
            getData()
        }).finally(()=>{
            loading.value = false;
        })
    }
    const changeHot = (hot,item)=>{
        opt.updateHot(item.id,hot).then((res)=>{
            showMsg("热门状态修改成功");
            item.hot = hot;
        })
    }

    return {
        searchForm,
        resetSearchForm,
        dataList,
        loading,
        currentPage,
        total,
        limit,
        multipleTableRef,
        getData,
        handleStatusChange,
        handleDelete,
        handleStatusChangeAll,
        handleDeleteAll,
        handleSelectionChange,
        changeHot
     }
}

/**
 * 폼 데이터를 공용으로 사용
 */
export function useInitFrom(opt = {}){
    const formDrawerRef = ref(null);
    const formRef = ref(null);
    const formData = reactive({});
    const defaultFormData = opt.form;
    const formRules = opt.rules || {};
    const editId = ref(0);
    const formTitle = computed(()=>editId.value ? "修改":"添加");

    /**
     * 关于submit function
     */
    const handleSubmit = ()=>{
        formRef.value.validate((valid)=>{
            if(!valid) return;
            formDrawerRef.value.showLoading();
            let body = {};
            if(opt.beforeSubmit && typeof  opt.beforeSubmit === "function"){
                 body = opt.beforeSubmit(formData);
            }else{
                body = formData;
            }
            let submit = editId.value ? opt.update(editId.value,body) : opt.create(body);
            submit.then((res)=>{
                showMsg(formTitle.value + "成功");
                opt.getDataList(editId.value ? false : 1);
                if(opt.resultCheck && typeof opt.resultCheck === 'function'){
                    opt.resultCheck();
                }
                formDrawerRef.value.closeDrawer();
            }).finally(()=>{
                formDrawerRef.value.closeLoading();
            })
        });
    }

    /**
     * 添加
     */
    const handleCreate = ()=>{
        editId.value = 0;
        resetFormData(defaultFormData);
        formDrawerRef.value.openDrawer();

    }

    /**
     * 修改
     */
    const handleUpdate = (row)=>{
        editId.value = row.id;
        resetFormData(row);
        formDrawerRef.value.openDrawer();
    }

    /**
     * 初始化form
     * */
    const resetFormData = (data = false)=>{
        if(formRef.value) formRef.value.clearValidate();
        for(const key in defaultFormData){
            formData[key] = data[key];
        }
    }

    return {
        editId,
        formDrawerRef,
        formRef,
        formData,
        formRules,
        formTitle,
        handleCreate,
        handleUpdate,
        resetFormData,
        handleSubmit
    }
}


/**
 * //자식 메뉴를 찾아서 chil속성에 배열을 넣는 부분
 * @param data - 총배열
 * @param field - 부모명칭
 * @param child - 자식태를 배열에 저장할 배열속성 이름
 * @param pid  - 부모를 나타낼 속성 값 즉 pid 가부모를 찾는 속성이라면 최상위일때 값 예:0
 * @param callF -리텀함수
 * @returns {*|*[]}
 */
export function listTrees(data,field='pid',child='child',pid=0,callF=null){
    if (!Array.isArray(data) || data.length === 0) return [];

    const getList = (pid1, items) => {
        const children = items.filter(item => {
            let isCheck = true;
            if (typeof callF === "function"){
                isCheck = callF(item);
            }
            return isCheck && item[field] === pid1;
        });

        children.forEach(item => {
            item[child] = getList(item['id'], items);
        });
        return children;
    };

    return getList(pid, data);
}

/**
 * 총메뉴를 내가 특정지어있는 메뉴 밑에 child 로 속성보내기 즉위에  listTrees 통하여 가공한다
 * @param menu - 최상위 카테고리 배열
 * @param allMenu - 최상상위카테고리랑 연관되여있으면  나한테도 부모카테고리가 있을때 최상위카테고리 child 속성 및 내자식도 child 포함
 * @param pid - allMenu 배열에서 부모 속성을 나타내는 값
 * @param child - 자식의 속성 값 예:child 라고 이름을 디폴트함
 * @returns {*}
 */
export function menuListTrees(menu,allMenu,pid="pid",child="child"){
    menu.forEach(item=>{
        item.child = (listTrees(allMenu,pid,child,item.id));
    })
    return menu;
}

//우선순위를 정하는 부분
export function orderTrees(menus,order='ranking'){
    function sortTreeByRanking(tree) {
        // 트리가 배열인지 확인 (최상위가 배열일 경우)
        if (Array.isArray(tree)) {
            // 배열의 각 노드를 정렬
            tree.sort((a, b) => b[order] - a[order] || b.id - a.id);
            // 각 노드의 child를 재귀적으로 정렬
            tree.forEach(node => {
                if (node.child && Array.isArray(node.child) && node.child.length > 0) {
                    sortTreeByRanking(node.child);
                }
            });
        }
        return tree;
    }

    sortTreeByRanking(menus.value);
}
//주메뉴에 서브메뉴 추가하는 방법
export function addSubmenu(mainMenu,subMenu){
    const rawMainMenu = toRaw(mainMenu);
    const rawSubMenu = toRaw(subMenu);
    rawMainMenu.forEach(item=>{
          if(item.child.length > 0){
              item.child.forEach(item1=>{
                 item1.child = rawSubMenu.filter(item2=>item2.category_id === item1.id);
              })
          }else{
              item.child = rawSubMenu.filter(item1=>item1.category_id === item.id);
          }
     })
    return rawMainMenu;
}

//요금제값을 소수형으로 변환시키는 방법
// 숫자를 한국식 포맷(232,500 또는 232,500.50)으로 변환하는 함수
export function priceDollar(value) {
    // 입력값이 없거나 유효하지 않으면 기본값 반환
    if (value === null || value === undefined || isNaN(value)) {
        return '0';
    }

    // 숫자로 변환
    const number = Number(value);

    // 소수점 2자리로 고정
    const formattedNumber = number.toFixed(2);

    // 정수 부분과 소수 부분 분리
    const [integerPart, decimalPart] = formattedNumber.split('.');

    // 정수 부분에 세 자리마다 쉼표 추가
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 소수점이 .00이면 소수점 이하 생략, 아니면 포함
    if (decimalPart === '00') {
        return integerWithCommas;
    }

    return `${integerWithCommas}.${decimalPart}`;
}

export function jsonEn(jsonCode){
    // 1. 외부 따옴표 제거
    const cleanedStr = jsonCode.slice(1, -1);
    const validJsonStr = cleanedStr.replace(/\\"/g, '"'); // \\\" -> "

    // 2. JSON 파싱
    try {
        return  JSON.parse(validJsonStr);
    } catch (e) {
        console.error("JSON 파싱 에러:", e.message);
        return [];
    }
}

//Three 컴포넌트에서 label, value,를 대입하는부분
/**
 * 중첩된 객체 배열에서 여러 키 이름을 재귀적으로 변경하는 함수
 * @param {Array} array - 키를 변경할 객체 배열
 * @param {Object} keyMap - {'기존키': '새키'} 쌍을 담은 객체
 * @returns {Array} 키가 변경된 새 배열
 */
export const changeThreeKey = (array, keyMap) => {
    return array.map(item => {
        let newItem = { ...item }; // 현재 객체 복사

        // 1. **다중 키 변경 로직:** keyMap 객체를 순회합니다.
        for (const oldKey in keyMap) {
            const newKey = keyMap[oldKey];

            // 기존 키가 현재 객체에 존재하는지 확인
            if (newItem.hasOwnProperty(oldKey)) {
                const value = newItem[oldKey];
                // 기존 키 삭제
                delete newItem[oldKey];
                // 새 키로 값 할당
                newItem[newKey] = value;
            }
        }

        // 2. **재귀 호출 조건:** child 속성이 존재하고 배열인지 확인
        if (newItem.child && Array.isArray(newItem.child)) {
            // child 배열에 대해 자기 자신을 호출 (keyMap을 그대로 전달)
            newItem.child = changeThreeKey(newItem.child, keyMap);
        }

        return newItem;
    });
};

/**
 * 서브메뉴 링크를 추출하는 부분
 */
export function getSubmenuLink(type){
    let link = "";
    if(type === 'goods'){
        link = `/pages/menu/menu`;
    }else if(type === 'goods_old'){
        link = `/pages/agreementPage/index`;
    }else if(type === 'agreement'){
        link = `/pages/agreementPage/index`;
    }else if(type === 'agreement_internet'){
        link = `/pages/agreementPage/index`;
    }else if(type === 'usim'){
        link = `/pages/simCard/simCard`;
    }else if(type === 'accessories'){
        link = `/pages/accessories/accessories`;
    }else if(type === 'shop'){
        link = "/pages/shop/shop";
    }
    return link;
}

/**
 * 랜덤 uid를위하여 랜덤 8자리 값을 갖는 방법
 */

export function getRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(length);

    crypto.getRandomValues(array);  // 안전한 랜덤 바이트 생성

    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += characters[array[i] % characters.length];
    }

    return result;
}