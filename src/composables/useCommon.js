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
                 getData();
             }

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
     * 데이터 삭제
     */
    const handleDelete = (id)=>{
        loading.value = true;
        opt.delete(id).then((res)=>{
            showMsg("删除成功");
            getData();
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

    return {
        searchForm,
        resetSearchForm,
        dataList,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleStatusChange,
        handleDelete,
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