<script setup>
  defineOptions({
    name: 'HeaderMenuList',
  })
  import ListHeader from "@/components/ListHeader.vue";
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import {addTitleMenu,updateTitleMenu,updateStatus,deleteTitleMenu,getTitleMenuList} from "@/api/titleMenu.js";

  const {
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
  } = useInitTable({




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
    handleSubmit
  } = useInitFrom({
    form:{
      name:"",
      child:[],
      priority:50
    },
    rules:{
      name:{
        required: true,
        message:"请填写菜单名称！",
        trigger:"blur"
      }
    },
    create:addTitleMenu,
    update:updateTitleMenu,
    getDataList:getData
  });


</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"/>
    <el-table
    >
    </el-table>
    <div style="margin-top:30px; display:flex; justify-content: center;align-items: center">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
         ref="formRef"
         :model="formData"
         :rules="formRules"
         label-width="auto"
     >
         <el-form-item prop="name" label="上菜单名称">
           <el-input v-model="formData.name"></el-input>
         </el-form-item>
         <el-form-item label="选择子菜单">
           <el-checkbox-group v-model="formData.child">
             <el-checkbox label="Option1" border >ㅁ</el-checkbox>
             <el-checkbox label="Option2" border >ㅁ</el-checkbox>
           </el-checkbox-group>
         </el-form-item>
         <el-form-item label="优先级">
           <el-input-number v-model="formData.priority"/>
         </el-form-item>
     </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>