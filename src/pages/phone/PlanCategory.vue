<script setup>
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import {createPlanCategory,deletePlanCategory,updatePlanCategory,updatePlanCategoryStatus,planCategoryList} from "@/api/phone/planCategory.js";
    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
      handleSelectionChange,
      changeHot
    } = useInitTable({
      getList: planCategoryList,
      updateStatus:updatePlanCategoryStatus,
      delete:deletePlanCategory,
    });
    const {
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
    }= useInitFrom({
      getDataList:getData,
      create:createPlanCategory,
      update:updatePlanCategory,
    });

</script>

<template>

</template>

<style scoped lang="scss">

</style>