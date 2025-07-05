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
    mobile:"",
    card_company:"",
    sale:""
  },
  rules:{
    mobile:{
      required: true,
      message:"选择通信社",
      trigger:"change"
    },
    card_company:{
      required: true,
      message:"填写银行名称",
      trigger:"blur"
    },
    sale:{
      required: true,
      message:"填写优惠最大价格",
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
      <el-form-item label="信用卡优惠" prop="mobile">
        <el-radio-group v-model="formData.mobile" size="large">
          <el-radio-button label="LG通信社" :value="1"/>
          <el-radio-button label="KT通信社" :value="2"/>
          <el-radio-button label="SK通信社" :value="3"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="银行名称">
          <el-input v-model="formData.card_company"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formData.sale"></el-input>
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>