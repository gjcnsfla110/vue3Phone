<script setup>
import ListHeader from "@/components/ListHeader.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {getSubPageCategoryList,subPageCategoryCreate,subPageCategoryDelete,updateStatus,subPageCategoryUpdate} from "@/api/main/subPageCategory.js";
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import Dialong from "@/components/Dialong.vue";
import ItemList from "@/components/subMenu/ItemList.vue";
import {ref} from "vue";

//아이테리스트 Dialong ref
const itemsListRef = ref();
const itemData = ref({});

//카테고리 아이템보기
const openItemList = (data)=>{
    itemData.value = { ...data };
    itemsListRef.value.openDialog();
}

/**
 * 데이터변수
 */
//검색변수
const categoryType = [
  {
    name: "선택안함",
    type: ""
  },
  {
    name:"휴대폰",
    type:"goods"
  },
  {
    name:"중고폰",
    type:"goods_old"
  },
  {
    name:"계약폰",
    type:"agreement"
  },
  {
    name:"인터넷약정",
    type:"agreement_internet"
  },
  {
    name:"유심",
    type:"usim"
  },
  {
    name:"악세사리",
    type:"accessories"
  },
]

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
    type:""
  },
  getList:getSubPageCategoryList,
  delete:subPageCategoryDelete,
  updateStatus:updateStatus,
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
    type:"",
    status:1,
    ranking:50
  },
  rules:{
    type:{
      required:true,
      message:"填写菜单category_Key",
      trigger:"change"
    },
    name:{
      required:true,
      message:"填写菜单名称",
      trigger:"blur"
    }
  },
  update:subPageCategoryUpdate,
  create:subPageCategoryCreate,
  getDataList:getData
});
getData();
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem>
        <el-select v-model="searchForm.type" placeholder="选择商品类型" style="width: 330px">
          <el-option
              v-for="item in categoryType"
              :key="item.type"
              :label="item.name"
              :value="item.type"
          />
        </el-select>
      </SearchItem>
    </Search>
    <el-table
        v-loading="loading"
        :data="dataList">
      <el-table-column prop="name" label="页面名称" width="300"></el-table-column>
      <el-table-column prop="type" label="填写菜单category_Key" width="300" align="center"></el-table-column>
      <el-table-column label="状态" width="280" align="center">
        <template #default="{row}">
          <el-switch @change="handleStatusChange(row.status,row)" v-model="row.status" active-text="显示" inactive-text="隐藏" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="添加商品" width="280" align="center">
        <template #default="{row}">
             <el-button type="primary" size="large" @click="openItemList(row)">添 加 商 品</el-button>
        </template>
      </el-table-column>
      <el-table-column label="其他设置" align="center">
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
      <el-pagination @change="getData" background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-width="auto">
      <el-form-item label="填写页面page_key" prop="type">
        <el-select v-model="formData.type" placeholder="填写页面page_key" style="width: 390px">
          <el-option
              v-for="item in categoryType"
              :key="item.type"
              :label="item.name"
              :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="name">
        <el-input v-model="formData.name" placeholder="填写页面名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status" size="large">
          <el-radio-button label="显示" :value="1" />
          <el-radio-button label="隐藏" :value="0" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="우선순위">
        <el-input-number v-model="formData.ranking"/>
      </el-form-item>
    </el-form>
  </Drawer>
  <Dialong ref="itemsListRef" :confirm="false" top="20vh">
      <ItemList :item="itemData" :key="itemData.id"></ItemList>
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
</style>