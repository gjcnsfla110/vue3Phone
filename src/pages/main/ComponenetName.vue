<script setup>
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    import {getComponentNameList,createComponentName,updateComponentName,deleteComponentName} from "@/api/main/componentName.js";

    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      getList:getComponentNameList,
      delete:deleteComponentName,
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
         name:""
      },
      rules:{
        name:{
          required: true,
          message:"컴포넌트 이름을 작성해주세요",
          trigger:"blur"
        }
      },
      update:updateComponentName,
      create:createComponentName,
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
        <el-table-column label="컴포넌트이름" prop="name" width="300">
        </el-table-column>
        <el-table-column label="설정" align="center">
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
      <el-form-item label="컴포넌트이름" prop="name">
        <el-input v-model="formData.name" placeholder="컴포넌트 이름을 작성해주세요"></el-input>
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