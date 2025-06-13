<script setup>
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {createPlanCategory,deletePlanCategory,updatePlanCategory,updatePlanCategoryStatus,planCategoryList} from "@/api/phone/planCategory.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
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
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>

    <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
      <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="auto">

    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>