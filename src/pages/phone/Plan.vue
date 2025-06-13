<script setup>
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {planList,createPlan,updatePlan,updatePlanStatus,deletePlan} from "@/api/phone/plan.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {ref} from "vue";
const categoryList = ref([]);
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
  handleSelectionChange,
  changeHot
} = useInitTable({
  defaultSearchForm:{
    category_id:""
  },
  afterDataList:(res)=>{
    dataList.value = res.list;
    total.value = res.total;
    categoryList.value = res.categorys;
  },
  getList: planList,
  updateStatus:updatePlanStatus,
  delete:deletePlan,
});
const {
  formDrawerRef,
  formRef,
  formData,
  formRules,
  formTitle,
  handleCreate,
  handleUpdate,
  resetFormData,
  handleSubmit
}= useInitFrom({
  form:{
    category_id:"",
    price:"",
    title:"",
    detail:"",
    ranking:50,
    status:1
  },
  rules:{
    category_id:{
      required: true,
      message:"选择套餐菜单",
      trigger:"change"
    },
    price:{
      required: true,
      message:'填写套餐价格',
      trigger:"blur"
    },
    title:{
      required: true,
      message:"填写套餐标题",
      trigger:"blur"
    },
    detail:{
      required: true,
      message:"填写套餐介绍",
      trigger:"blur"
    }
  },
  getDataList:getData,
  create:createPlan,
  update:updatePlan,
});
getData();

function formatCurrency(value) {
  // 숫자 또는 문자열을 숫자로 변환하고 소수점 이하 제거
  const number = Math.floor(Number(value));
  // 천 단위 쉼표 추가 및 화폐 기호($) 추가
  return `$ ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
       <search-item>
         <el-select
             v-model="searchForm.category_id"
             placeholder="选择菜单"
             style="width: 240px"
         >
           <el-option
               v-for="item in categoryList"
               :key="item.id"
               :label="item.name"
               :value="item.id"
           />
         </el-select>
       </search-item>
    </Search>
    <el-table
    v-loading="loading"
    :data="dataList">
       <el-table-column label="套餐名称" prop="title" width="380">
       </el-table-column>
      <el-table-column label="价格"  width="200" align="center">
        <template #default="{row}">
           {{formatCurrency(row.price)}}원
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150" align="center">
        <template #default="{row}">
          <el-switch
              v-model="row.status"
              active-text="正常"
              inactive-text="禁用"
              width="40px"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event,row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="其他" align="center">
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
    <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
      <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="auto">
       <el-form-item prop="category_id" label="套餐菜单">
         <el-select
             v-model="formData.category_id"
             placeholder="选择菜单"
             style="width: 240px"
         >
           <el-option
               v-for="item in categoryList"
               :key="item.id"
               :label="item.name"
               :value="item.id"
           />
         </el-select>
       </el-form-item>
      <el-form-item label="套餐题目" prop="title" style="width: 700px">
         <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="detail" style="width: 700px">
        <el-input
            v-model="formData.detail"
            maxlength="1000"
            placeholder="填写套餐内容"
            rows="8"
            type="textarea"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price" style="width: 700px">
        <el-input v-model="formData.price" placeholder="填写价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status" size="large">
          <el-radio-button label="显示" :value="1" />
          <el-radio-button label="隐藏" :value="0" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="formData.ranking"/>
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>