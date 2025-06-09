<script setup>
   import ListHeader from "@/components/ListHeader.vue";
   import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
   import {getList,createPage,updatePage,updateStatus,deletePage} from "@/api/main/mainPage.js";
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
   } = useInitTable({
      getList:getList,
      delete:deletePage,
      updateStatus:updateStatus,
   });

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
      form:{
        page_key:"",
        name:"",
        status:1
      },
      rules:{
        page_key:{
          required:true,
          message:"填写页面pageKey",
          trigger:"blur"
        },
        name:{
          required:true,
          message:"填写页面名称",
          trigger:"blur"
        }
      },
      update:updatePage,
      create:createPage,
      getDataList:getData
   });
   getData();
</script>

<template>
    <el-card>
      <ListHeader @create="handleCreate"></ListHeader>
      <el-table
      v-loading="loading"
      :data="dataList">
         <el-table-column prop="name" label="页面名称" width="200"></el-table-column>
         <el-table-column prop="page_key" label="page_key" width="220"></el-table-column>
         <el-table-column label="状态" width="200" align="center">
           <template #default="{row}">
             <el-switch @change="handleStatusChange(row.status,row)" v-model="row.status" active-text="显示" inactive-text="隐藏" :active-value="1" :inactive-value="0" />
           </template>
         </el-table-column>
         <el-table-column label="其他设置" align="center">
           <template #default="{row}">
             <el-button @click="handleUpdate(row)" type="primary" text bg>修改</el-button>
             <el-popconfirm
                 confirm-button-text="确认"
                 cancel-button-text="取消"
                 icon-color="#626AEF"
                 title="确定删除吗？"
                 @confirm="handleDelete(row.id)"
             >
               <template #reference>
                 <el-button type="danger" text bg>删除</el-button>
               </template>
             </el-popconfirm>
           </template>
         </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
       <el-form
       :model="formData"
       :rules="formRules"
       ref="formRef"
       label-width="auto">
          <el-form-item label="页面key" prop="page_key">
              <el-input v-model="formData.page_key" placeholder="填写页面page_key"></el-input>
          </el-form-item>
          <el-form-item label="页面名称" prop="name">
              <el-input v-model="formData.name" placeholder="填写页面名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="formData.status" size="large">
              <el-radio-button label="显示" :value="1" />
              <el-radio-button label="隐藏" :value="0" />
            </el-radio-group>
          </el-form-item>
       </el-form>
    </Drawer>
</template>

<style scoped lang="scss">
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>