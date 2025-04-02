<script setup>
    defineOptions({
      name: 'GoodsService',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
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

    });
</script>

<template>
    <el-card>
        <ListHeader @create="handleCreate" @reset="getData"></ListHeader>
        <el-table
          v-loading="loading"
          :data="dataList"
          border
        >
            <el-table-column>

            </el-table-column>
            <el-table-column>

            </el-table-column>
            <el-table-column>

            </el-table-column>
        </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit" >
        <el-form>

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