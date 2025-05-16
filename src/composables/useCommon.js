import {ref, reactive, computed} from 'vue'
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
        opt.changeHot(item.id,hot).then((res)=>{
            showMsg("状态修改成功");
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

export function menuListTrees(menu,allMenu,pid="pid",child="child"){
    menu.forEach(item=>{
        item.child = (listTrees(allMenu,pid,child,item.id));
    })
    return menu;
}

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