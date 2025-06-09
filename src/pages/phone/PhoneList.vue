<script setup>
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import {getPhoneList,createPhone,updatePhone,updateHot,updateStatus,itemDetail,deletePhone} from "@/api/phone/phoneList.js";
  import Search from "@/components/Search.vue";
  import ListHeader from "@/components/ListHeader.vue";

  const {
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
  }= useInitTable({
    defaultSearchForm:{
        title:"",
        category_id:"",
    }
  })

  const {
    formDrawerRef,
    formRef,
    formData,
    formRules,
    formTitle,
    handleCreate,
    handleUpdate,
    handleSubmit
  } = useInitFrom({

  })

</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search></Search>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
     :model="formData"
     :rules="formRules"
     ref="formRef">

     </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>