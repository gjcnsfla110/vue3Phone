<script setup>
    defineOptions({
       name: 'DeliveryCompany',
    })
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import ListHeader from "@/components/ListHeader.vue";
    import{getDeliveryCompanyList,updateDeliveryCompany,deleteDeliveryCompany,createDeliveryCompany} from "@/api/goods/deliveryCompany.js";

    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      getList:getDeliveryCompanyList,
      delete:deleteDeliveryCompany,
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
         name:"",
         link:""
      },
      rules:{
         name:{
           required: true,
           message:'填写公司名称',
           trigger:"blur"
         },
         link:{
           required: true,
           message:'填写公司网址',
           trigger:"blur"
         }
      },
      getDataList:getData,
      create:createDeliveryCompany,
      update:updateDeliveryCompany,
    })
    getData();
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate" @reset="getData"></ListHeader>
    <el-table
      v-loading="loading"
      :data="dataList"
      border
    >
       <el-table-column label="公司名称" prop="name" >

       </el-table-column>
        <el-table-column label="公司网址" align="center">
          <template #default="{row}">
            <el-link type="success" :href="row.link" target="_blank">조회링크</el-link>
          </template>
        </el-table-column>
      <el-table-column label="设置" align="center">
        <template #default="{row}">
          <el-button type="primary" plain @click="handleUpdate(row)">修改</el-button>
          <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button
                  type="danger"
                  plain
              >
                删除
              </el-button>
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
      label-width="auto"
      >
        <el-form-item label="公司名称" prop="name">
            <el-input v-model="formData.name" placeholder="填写公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司网址" prop="link">
          <el-input v-model="formData.link" placeholder="填写公司网址"></el-input>
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