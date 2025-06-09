<script setup>
  import {useInitFrom, useInitTable} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {createSideCategory,updateSideCategory,updateStatus,deleteSideCategory,getSideCategoryList} from "@/api/phone/sideCategory.js";
  import {ref} from "vue";
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
    getList: getSideCategoryList,
    updateStatus:updateStatus,
    delete:deleteSideCategory,
  });
  const{
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
  } = useInitFrom({
      form:{
         name:"",
         img:"",
         label:"",
         label_type:0,
         ranking:50,
         status:1,
      },
      rules:{
         name:{
           required: true,
           message:"填写名称",
           trigger:"blur"
         },
         img:{
           required: true,
           message:"填写展示图片链接",
           trigger:"blur"
         },
      },
      getDataList:getData,
      create:createSideCategory,
      update:updateSideCategory,
  })
  getData();

</script>

<template>
    <el-card>
       <ListHeader @create="handleCreate"></ListHeader>
       <el-table
       v-loading="loading"
       :data="dataList" border style="width: 100%">
         <el-table-column prop="name" label="名称" width="300">
         </el-table-column>
       </el-table>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
        <el-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-width="auto"
        >
         <el-form-item label="名称" prop="name" style="width: 88%">
             <el-input v-model="formData.name" placeholder="请填写副菜单名称"></el-input>
         </el-form-item>
          <el-form-item label="图片链接" prop="img" style="width: 88%">
             <el-input v-model="formData.img" placeholder="请填写图片链接"></el-input>
          </el-form-item>
          <el-form-item label="标题_label" >
             <el-input v-model="formData.label" placeholder="请填写标题_label"></el-input>
          </el-form-item>
          <el-form-item label="选择标题模版">
             <el-radio-group v-model="formData.label_type">
               <el-radio-button :value="0" label="无"></el-radio-button>
               <el-radio-button :value="" label="新品"></el-radio-button>
               <el-radio-button :value="2" label="热卖"></el-radio-button>
               <el-radio-button :value="3" label="销量高"></el-radio-button>
               <el-radio-button :value="4" label="打折"></el-radio-button>
               <el-radio-button :value="5" label="特卖"></el-radio-button>
               <el-radio-button :value="6" label="性价比"></el-radio-button>
             </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="formData.ranking"></el-input-number>
          </el-form-item>
        </el-form>
    </Drawer>
</template>

<style scoped lang="scss">

</style>