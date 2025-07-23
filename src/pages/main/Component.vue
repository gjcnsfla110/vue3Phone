<script setup>

import ListHeader from "@/components/ListHeader.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {getComponentList,createComponent,updateComponent,deleteComponent,updateStatus} from "@/api/main/component.js";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
import CheckImg from "@/components/CheckImg.vue";

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
      dataList.value = res.list;
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
    more:0,
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
    },
    title:{
      required:true,
      message:"타이틀을 입력해주세요",
      trigger:"blur"
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
    :data="dataList"
    >
       <el-table-column label="타이틀" prop="title" width="300">
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
        <el-form-item label="타이틀" prop="title">
          <el-input
              v-model="formData.title"
              maxlength="30"
              style="width: 450px"
              placeholder="타이틀을 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="작은타이틀" >
          <el-input
              v-model="formData.title1"
              maxlength="30"
              style="width: 450px"
              placeholder="작은타이틀을 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="내용제목">
          <el-input
              v-model="formData.content_title"
              :rows="5"
              maxlength="300"
              style="width: 450px"
              placeholder="내용제목을 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="내용부제목">
          <el-input
              v-model="formData.content_title1"
              maxlength="300"
              :rows="5"
              style="width: 450px"
              placeholder="내용 부제목을 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="더보기">
          <el-radio-group v-model="formData.more" size="large">
            <el-radio-button label="숨김" :value="0" />
            <el-radio-button label="정상" :value="1" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="더보기링크">
          <el-input
              v-model="formData.more_link"
              maxlength="300"
              style="width: 450px"
              placeholder="더보기 링크를 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="큰이미지">
           <CheckImg v-model="formData.img"></CheckImg>
        </el-form-item>
        <el-form-item label="탑이미지">
          <CheckImg v-model="formData.top_img"></CheckImg>
        </el-form-item>
        <el-form-item label="배너아이템">
          <el-radio-group v-model="formData.banner" size="large">
            <el-radio-button label="아님" :value="0" />
            <el-radio-button label="맞음" :value="1" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="아이템수">
          <el-input v-model="formData.item_size" style="width: 180px" placeholder="아이템수를 입력하세요"></el-input>
        </el-form-item>
        <el-form-item label="상태">
          <el-radio-group v-model="formData.status" size="large">
            <el-radio-button label="아님" :value="0" />
            <el-radio-button label="맞음" :value="1" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="우선순위">
          <el-input-number v-model="formData.ranking"/>
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