<script setup>

import ListHeader from "@/components/ListHeader.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {getComponentList,createComponent,updateComponent,deleteComponent,updateStatus} from "@/api/main/component.js";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";

//컴포넌트이름/속하는페이지
const pages = ref([]);
const componentNames = ref([]);
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
  afterDataList:(res)=>{
      pages.value = res.pages;
      componentNames.value = res.componentNames;
      total.value = res.total;
      dataList.value = res.dataList;
  },
  getList:getComponentList,
  updateStatus:updateStatus,
  delete:deleteComponent,
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
  },
  rules:{
    page_id:{
      required: true,
      message:"페이지를 선택해주세요",
      trigger:"change"
    },
    component:{
      required:true,
      message:"컴포넌트를 선택해주세요",
      trigger:"change"
    }
  },
  create:createComponent,
  update:updateComponent,
  getDataList:getData,
});
getData();
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
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
        <el-form-item label="페이지" prop="page_id">
          <el-select v-model="formData.page_id" placeholder="페이지선택" style="width: 240px">
            <el-option
                v-for="item in pages"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="컴포넌트" prop="component">
          <el-select v-model="formData.component" placeholder="컴포넌트선택" style="width: 240px">
            <el-option
                v-for="item in componentNames"
                :key="item.id"
                :label="item.name"
                :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item>

        </el-form-item>
        <el-form-item>

        </el-form-item>
        <el-form-item>

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