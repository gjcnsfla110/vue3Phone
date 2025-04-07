<script setup>
    import SearchItem from "@/components/SearchItem.vue";

    defineOptions({
      name: 'Goods',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import Search from "@/components/Search.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";

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

        },
        rules:{

        }
    });

</script>
<template>
    <el-card>
       <div style="margin-bottom: 15px">
          <el-button type="primary" size="large" @click="handleCreate">添加商品</el-button>
       </div>
       <Search backColor="rgb(248,248,248)">
          <search-item>
              <el-input></el-input>
          </search-item>
       </Search>
       <el-table
           :data="dataList"
           v-loading="loading"
       >
          <el-table-column></el-table-column>
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
        >

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