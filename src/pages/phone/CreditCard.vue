<script setup>
import {useInitTable,useInitFrom,priceDollar} from "@/composables/useCommon.js";
import {creditCardList,updateCreditCard,updateCreditCardStatus,deleteCreditCard,createCreditCard} from "@/api/phone/creditCard.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
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
    mobile:""
  },
  getList: creditCardList,
  updateStatus:updateCreditCardStatus,
  delete:deleteCreditCard,
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
}= useInitFrom({
  form:{
    mobile:"",
    card_company:"",
    sale:"",
    status:1
  },
  rules:{
    mobile:{
      required: true,
      message:"选择通信社",
      trigger:"change"
    },
    card_company:{
      required: true,
      message:"填写银行名称",
      trigger:"blur"
    },
    sale:{
      required: true,
      message:"填写优惠最大价格",
      trigger:"blur"
    }
  },
  getDataList:getData,
  create:createCreditCard,
  update:updateCreditCard,
});
getData();
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem label="主菜单">
        <el-radio-group v-model="searchForm.mobile" size="large" fill="#6cf">
          <el-radio-button label="LG通信社" :value="1" />
          <el-radio-button label="KT通信社" :value="2" />
          <el-radio-button label="SK通信社" :value="3" />
        </el-radio-group>
      </SearchItem>
    </Search>
    <el-table
        :data="dataList"
        v-loading="loading"
        style="margin-top: 38px"
    >
       <el-table-column label="通信社" width="200">
         <template #default="{row}">
           <el-text v-if="row.mobile == 1" class="mx-1" type="danger">LG-통신사</el-text>
           <el-text v-else-if="row.mobile == 2" class="mx-1" type="info">KT-통신사</el-text>
           <el-text v-else-if="row.mobile == 3" class="mx-1" type="primary">SK-통신사</el-text>
         </template>
       </el-table-column>
       <el-table-column label="银行名称" prop="card_company" align="center" width="300"></el-table-column>
       <el-table-column label="优惠价格" align="center" width="200">
         <template #default="{row}">
            <p>{{priceDollar(row.sale)}} 원</p>
         </template>
       </el-table-column>
       <el-table-column label="状态" align="center" width="180">
         <template #default="{row}">
           <el-switch
               v-model="row.status"
               width="50px"
               :active-value="1"
               :inactive-value="0"
               @change="handleStatusChange($event,row)"
           />
         </template>
       </el-table-column>
       <el-table-column label="设置" align="center">
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
      <el-form-item label="信用卡优惠" prop="mobile">
        <el-radio-group v-model="formData.mobile" size="large">
          <el-radio-button  label="LG通信社" :value="1"/>
          <el-radio-button  label="KT通信社" :value="2"/>
          <el-radio-button  label="SK通信社" :value="3"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="银行名称" prop="card_company">
          <el-input v-model="formData.card_company"></el-input>
      </el-form-item>
      <el-form-item label="优惠价格" prop="sale">
        <el-input v-model="formData.sale" :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>