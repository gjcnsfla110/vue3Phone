<script setup>
    defineOptions({
       name: 'Delivery',
    })
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import {getDeliveryList,createDelivery,updateDelivery,deleteDelivery} from "@/api/goods/delivery.js";
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      getList:getDeliveryList,
      delete:deleteDelivery,
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
      form:{
        title:"",
        description:"",
      },
      rules:{
        title:{
          required: true,
          message:'',
          trigger:"blur"
        },
        description:{
          required: true,
          message:'',
          trigger:"blur"
        }
      },
      getDataList:getData,
      update:updateDelivery,
      create:createDelivery,
    });
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
          <el-table-column  label="配送方法" prop="title" width="260">

          </el-table-column>
          <el-table-column align="center" prop="description" label="配送详细" width="600">
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
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="auto"
        >
           <el-form-item label="配送方法" prop="title">
              <el-input v-model="formData.title" placeholder="请填写配送方法"></el-input>
           </el-form-item>
           <el-form-item label="配送详细" prop="description">
              <el-input v-model="formData.description" show-word-limit maxlength="120" type="textarea" :rows="5" placeholder="请填写配送详细"></el-input>
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