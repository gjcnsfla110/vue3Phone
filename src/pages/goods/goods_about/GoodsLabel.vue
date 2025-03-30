<script setup>
    defineOptions({
       name: "GoodsLabel",
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import {getLabelList,createLabel,updateLabel,deleteLabel} from "@/api/goods/label.js";

    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
       delete:deleteLabel,
       getList:getLabelList,
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
          name:""
        },
        rules:{
          name:{
            required: true,
            message:'填写标签',
            trigger:"blur"
          }
        },
        getDataList:getData,
        create:createLabel,
        update:updateLabel,
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
         <el-table-column
             label="标签名称"
             prop="name"
             width="500"
         >
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
            <el-form-item label="标签名称" prop="name">
               <el-input v-model="formData.name" placeholder="填写标签名称"></el-input>
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