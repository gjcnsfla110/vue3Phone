<script setup>

import ListHeader from "@/components/ListHeader.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
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
  defaultSearchForm:{
    page_id:""
  },
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
    page_id:"",
    component:"",
    title:"",
    title1:"",
    content_title:"",
    content_title1:"",
    more:"",
    more_link:"",
    list:[],
    list1:[],
    img:"",
    top_img:"",
    banner:0,
    ranking:50,
    status:1
  }
});

</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search>
      <SearchItem>

      </SearchItem>
    </Search>
    <el-table
    v-loading="loading"
    :data="[]"
    >
       <el-table-column>
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
        <el-form-item label="페이지">
          <el-select v-model="formData.page_id" placeholder="Select" style="width: 240px">
            <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="컴포넌트">
          <el-select v-model="formData.component" placeholder="Select" style="width: 240px">
            <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
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