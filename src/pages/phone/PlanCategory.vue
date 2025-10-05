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
      handleSubmit
    }= useInitFrom({
      form:{
        name:"",
        status:1,
        ranking:50
      },
      getDataList:getData,
      create:createPlanCategory,
      update:updatePlanCategory,
    });
    getData();
</script>

<template>
    <el-card>
      <ListHeader @create="handleCreate"></ListHeader>
      <el-table
          v-loading="loading"
          :data="dataList"
      >
         <el-table-column label="名称" prop="name" width="300"></el-table-column>
         <el-table-column label="状态" width="200" align="center">
           <template #default="{row}">
               <el-switch
                   v-model="row.status"
                   style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                   :active-value="1"
                   :inactive-value="0"
                   @change="handleStatusChange(row.status,row)"
               />
           </template>
         </el-table-column>
         <el-table-column label="操作" align="center">
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
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination @change="getData" background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
       <el-form
       ref="formRef"
       :model="formData"
       :rules="formRules"
       label-width="auto">
           <el-form-item label="名称" style="width: 600px">
              <el-input v-model="formData.name"></el-input>
           </el-form-item>
           <el-form-item label="状态">
             <el-switch
                 v-model="formData.status"
                 style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                 :active-value="1"
                 :inactive-value="0"
             />
           </el-form-item>
           <el-form-item>
             <el-form-item label="排序">
               <el-input-number v-model="formData.ranking" />
             </el-form-item>
           </el-form-item>
       </el-form>
    </Drawer>
</template>

<style scoped lang="scss">

</style>