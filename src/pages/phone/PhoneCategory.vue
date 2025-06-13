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
  form:{
      pid:"",
      name:"",
      ranking:50,
      status:1,
      hot:0
  },
  rules:{
      pid:{
        required: true,
        message:"选择上级菜单",
        trigger:"change"
      },
      name:{
        required: true,
        message:"填写名称",
        trigger:"blur"
      }
  },
  getDataList:getData,
  create:createPlanCategory,
  update:updatePlanCategory,
});

</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <el-table
      v-loading="loading"
      :data="dataList"
    >

    </el-table>
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
      <el-form-item label="上级菜单" prop="pid">
        <el-cascader
            v-model="formData.pid"
            :options="menus"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择上级菜单"
        />
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>