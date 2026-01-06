<script setup>

import ListHeader from "@/components/ListHeader.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {getComponentList,createComponent,updateComponent,deleteComponent,updateStatus} from "@/api/main/component.js";
import ComponentBanner from "@/pages/main/ComponentBanner.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
import CheckImg from "@/components/CheckImg.vue";
import Dialong from "@/components/Dialong.vue";
import ComponentItem from "@/pages/main/ComponentItem.vue";
import ShowComponents from "@/components/ShowComponents.vue";


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
    page_key:""
  },
  afterDataList:(res)=>{
      pages.value = res.pages;
      total.value = res.total;
      dataList.value = res.list;
  },
  getList:getComponentList,
  updateStatus:updateStatus,
  delete:deleteComponent,
})
limit.value = 50;
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
    page_key:"",
    component:"",
    type:"",
    title:"",
    title1:"",
    content_title:"",
    content_title1:"",
    img:"",
    top_img:"",
    item_size:"",
    ranking:50,
    status:1
  },
  rules:{
    page_key:{
      required: true,
      message:"페이지를 선택해주세요",
      trigger:"change"
    },
    component:{
      required:true,
      message:"컴포넌트를 선택해주세요",
      trigger:"change"
    },
    type:{
      required:true,
      message:"컴포넌트를 타입을 선택해주세요",
      trigger:"blur"
    },
    item_size:{
      required:true,
      message:"추가아이템개수를 선택해주세요",
      trigger:"blur"
    }
  },
  create:createComponent,
  update:updateComponent,
  getDataList:getData,
});
getData();
const pageName = (key)=>{
  let name = pages.value.filter(item => key == item.page_key);
  return name[0];
}

/*------------------------------------------------- 아이템부분 --------------------------------------------------------------------*/
//아이템 보기
const itemId = ref("");
const itemType = ref("");
const addItem = ref("");
const itemCount = ref(10);
const clickItem = (item)=>{
  itemId.value = item.id;
  itemType.value = item.type;
  itemCount.value = item.item_size;
  addItem.value.openDialog();
}
/*------------------------------------------------- 배너부분 --------------------------------------------------------------------*/
//배너 보기
const bannerId = ref("");
const addBanner = ref("");
const clickBanner = (id)=>{
  addBanner.value.openDialog();
  bannerId.value=id;
}
/*------------------------------------------------- 컴포넌트 이름체크부분 ---------------------------------------------------------------*/
//컴포넌트 보기
const componentNameRef = ref();
const clickShowComponents = ()=>{
   componentNameRef.value.openDialog();
}
const clickCloseComponents = ()=>{
   componentNameRef.value.closeDialog();
}
const changeComponentItem = (name)=>{
   formData.component = name;
}
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem>
        <el-select v-model="searchForm.page_key" placeholder="选择商品类型" style="width: 330px">
          <el-option
              v-for="item in pages"
              :key="item.id"
              :label="item.name"
              :value="item.page_key"
          />
        </el-select>
      </SearchItem>
    </Search>
    <el-table
    v-loading="loading"
    :data="dataList"
    >
       <el-table-column label="컴포넌트" width="180" prop="component">
       </el-table-column>
       <el-table-column label="페이지" width="180" align="center">
         <template #default="{row}">
           <p><span style="color: #3498db">{{pageName(row.page_key).name}}</span> - ( <span style="color: rgb(50,50,50)">{{pageName(row.page_key).page_key}}</span> )</p>
         </template>
       </el-table-column>
      <el-table-column label="타이틀" width="380" prop="title" align="center">
      </el-table-column>
      <el-table-column label="아이템" width="230" align="center">
        <template #default="{row}">
          <div v-if="row.type === 'banner'">
            <el-button  type="danger" round @click="clickBanner(row.id)">배너보기</el-button>
          </div>
          <div v-else-if="row.type === 'title'">
            <el-button type="danger" round disabled>组件标题</el-button>
          </div>
          <div v-else>
            <el-button type="danger" round @click="clickItem(row)">아이템보기</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更改状态" align="center" width="230">
        <template #default="{row}">
          <el-switch @change="handleStatusChange(row.status,row)" v-model="row.status" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="설정" align="center">
        <template #default="{row}">
          <el-button @click="handleUpdate(row)" type="primary" text bg>修改</el-button>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon-color="#626AEF"
              title="确定删除管理员吗？"
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
      <el-pagination @change="getData" background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="auto">
        <el-form-item label="페이지" prop="page_id">
          <el-select v-model="formData.page_key" placeholder="페이지선택" style="width: 240px">
            <el-option
                v-for="item in pages"
                :key="item.id"
                :label="item.name"
                :value="item.page_key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="컴포넌트" prop="component">
            <el-button type="success" round @click="clickShowComponents">컴포넌트석택</el-button>
            <el-text  style="margin-left: 30px" v-if="formData.component !==''" class="mx-1" type="success" size="large">{{formData.component}}</el-text>
        </el-form-item>
        <el-form-item label="컴포넌트_타입" prop="type">
          <el-radio-group v-model="formData.type" size="large" fill="#6c6cff">
            <el-radio-button label="电子产品" value="goods" />
            <el-radio-button label="手机配件" value="accessories" />
            <el-radio-button label="合约机" value="agreement" />
            <el-radio-button label="手机卡" value="usim" />
            <el-radio-button label="Banner" value="banner" />
            <el-radio-button label="组件标题" value="title" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="왼쪽타이틀">
          <el-input
              v-model="formData.title"
              maxlength="30"
              style="width: 450px"
              placeholder="컴포넌트 왼쪽 타이틀을 입력하세요"
              show-word-limit
              type="textarea"
          />
        </el-form-item>
        <el-form-item label="오른쪽타이틀" >
          <el-input
              v-model="formData.title1"
              maxlength="30"
              style="width: 450px"
              placeholder="컴포넌트 오른쪽 작은타이틀을 입력하세요"
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
        <el-form-item label="큰이미지">
           <CheckImg v-model="formData.img"></CheckImg>
        </el-form-item>
        <el-form-item label="탑이미지">
          <CheckImg v-model="formData.top_img"></CheckImg>
        </el-form-item>
        <el-form-item label="아이템수" prop="item_size">
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
  <Dialong ref="addItem" title="컴포넌트-아이템" :confirm="false" width="80%" height="30%" top="25vh">
      <ComponentItem :componentId="itemId" :componentType="itemType" :itemCount="itemCount"></ComponentItem>
  </Dialong>
  <Dialong ref="addBanner" title="컴포넌트-배너" width="80%" height="30%" top="25vh" :confirm="false" :card="false">
      <ComponentBanner :componentId="bannerId"></ComponentBanner>
  </Dialong>
  <Dialong ref="componentNameRef" @submit="clickCloseComponents">
      <ShowComponents @changeCName="changeComponentItem"></ShowComponents>
  </Dialong>
</template>

<style scoped lang="scss">
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goodsContent{
   margin-bottom: 20px;
   padding: 20px;
   border-bottom: 1px solid #eee;
}
.goodsTitle{
   margin-left: 5px;
   font-size: 16px;
   color: rgb(0,128,255);
}
.goodsText{
   font-size: 14px;
   color: rgb(150,150,150);
}
</style>