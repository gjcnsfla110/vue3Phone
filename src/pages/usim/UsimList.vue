<script setup>
import {useInitTable, useInitFrom, listTrees} from "@/composables/useCommon.js";
  import ListHeader from "@/components/ListHeader.vue";
  import Drawer from "@/components/Drawer.vue";
  import {createUsim,updateUsim,updateStatus,updateHot,deleteUsim,getUsimList} from "@/api/usim/usimList.js";
  import {ref} from "vue";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";
  const firstList = ref(1);
  const categoryList = ref([]);
  const categorys = ref([]);
  const {
    searchForm,
    resetSearchForm,
    dataList,
    loading,
    currentPage,
    total,
    limit,
    multipleTableRef,
    getData,
    handleStatusChange,
    handleDelete,
    handleStatusChangeAll,
    handleDeleteAll,
    handleSelectionChange,
    changeHot
  } = useInitTable({
     defaultSearchForm:{
        title:"",
        category_id:"",
        mobile:"",
        isCheck:1
     },
     getList:getUsimList,
     delete:deleteUsim,
     updateStatus:updateStatus,
     changeHot:updateHot,
     afterDataList(res){
       dataList.value = res.list;
       if(firstList.value < 2){
         categoryList.value = listTrees(res.category,'pid','child');
         categorys.value = res.category;
       }
       searchForm.isCheck= firstList.value+1;
       firstList.value = firstList.value+1;
     }
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
  } = useInitFrom({
    create:createUsim,
    update:updateUsim,
    getDataList:getData,
    form:{
       'category_id':"",
       'title':"",
       'detail':"",
       'mobile':1,
       'price':"",
       'data':"",
       'talk_time':"",
       'mns':"",
       'other':"",
       'agreement':"",
       'ranking':50,
       'status':1,
       'hot':0
    },
    rules:{
      'category_id':{
        required: true,
        message:"请选择上级菜单",
        trigger:"change"
      },
      'title':{
        required: true,
        message:"请填写套餐名称",
        trigger:"blur"
      },
      'detail':{
        required: true,
        message:"请填写套餐介绍",
        trigger:"blur"
      },
      'mobile':{
        required: true,
        message:"请选择通信社公司",
        trigger:"change"
      },
      'price':{
        required: true,
        message:"请填写套餐价格",
        trigger:"blur"
      },
      'data':{
        required: true,
        message:"请填写套餐可上网流量",
        trigger:"blur"
      },
      'talk_time':{
        required: true,
        message:"请填写套餐通话时间",
        trigger:"blur"
      },
      'mns':{
        required: true,
        message:"请填写套餐(MNS)信息",
        trigger:"blur"
      },
      'other':{
        required: true,
        message:"请填写套餐附加服务",
        trigger:"blur"
      },
      'agreement':{
        required: true,
        message:"请填写套餐合约时间",
        trigger:"blur"
      },
    }

  });
  getData();

  const categoryName = (checkId)=>{
      return categoryList.value.find(item => item.id == categorys.value.find(item => item.id == checkId)?.pid)?.name
             ? categoryList.value.find(item => item.id == categorys.value.find(item => item.id == checkId)?.pid)?.name : "无";
  }
</script>
<template>
   <el-card shadow="always" v-loading="loading">
      <ListHeader @create="handleCreate" @refresh="getData" />
     <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
       <search-item label="套餐标题">
         <el-input v-model="searchForm.title" placeholder="填写详细标题"></el-input>
       </search-item>
       <template #show>
         <SearchItem label="套餐分类">
           <el-cascader
               v-model="searchForm.category_id"
               :options="categoryList"
               :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
               placeholder="请选择套餐分类"
               style="width: 330px"
           />
         </SearchItem>
         <SearchItem label="通信社">
           <el-select v-model="searchForm.mobile" placeholder="选择通信社" style="width: 330px">
             <el-option
                 v-for="item in [{label:'LG-通信社',value:'1'},{label:'KT-通信社',value:'2'},{label:'SK-通信社',value:'3'}]"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
             />
           </el-select>
         </SearchItem>
       </template>
     </Search>
      <el-table
          :data="dataList"
          v-loading="loading"
          style="width: 100%; margin-top: 30px"
      >
         <el-table-column label="套餐名称" align="center" width="380">
           <template #default="{row}">
             <p style="margin:8px 0; font-size:15px; color:rgb(160,160,160);">{{row.title}}</p>
             <el-button v-if="row.mobile == 1" type="danger" size="small" round>LG-通信社</el-button>
             <el-button v-else-if="row.mobile == 2" type="success" size="small" round>KT-通信社</el-button>
             <el-button v-else-if="row.mobile == 3" type="primary" size="small" round>SK-通信社</el-button>
           </template>
         </el-table-column>
         <el-table-column label="套餐类型" align="center" width="180">
           <template #default="{row}">
             <el-button color="#626aef" disabled plain>
                {{categoryName(row.category_id)}}
             </el-button>
           </template>
         </el-table-column>
         <el-table-column label="热门套餐" align="center" width="180">
           <template #default="{row}">
             <el-switch
                 v-model="row.hot"
                 inline-prompt
                 style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
                 active-text="HoT"
                 inactive-text="N"
                 :active-value="1"
                 :inactive-value="0"
                 size="large"
             />
           </template>
         </el-table-column>
        <el-table-column label="其他" align="center">
          <template #default="{row}">

          </template>
        </el-table-column>
      </el-table>
     <div class="bottomPage">
       <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
     </div>
   </el-card>
   <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
      :model="formData"
      :rules="formRules"
      label-width="auto"
      ref="formRef"
      >
        <el-form-item label="上级菜单" prop="category_id">
          <el-cascader
              v-model="formData.category_id"
              :options="categoryList"
              :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
              placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="通信公司" prop="mobile">
          <el-radio-group v-model="formData.mobile" size="large" fill="#6cf">
            <el-radio-button label="LG-通信社" :value="1" />
            <el-radio-button label="KT-通信社" :value="2" />
            <el-radio-button label="SK-通信社" :value="3" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="套餐名称" prop="title">
           <el-input style="width: 600px" v-model="formData.title" placeholder="请填写套餐名称"></el-input>
        </el-form-item>
        <el-form-item label="套餐介绍" prop="detail">
          <el-input
              v-model="formData.detail"
              style="width: 600px"
              :rows="8"
              type="textarea"
              placeholder="请填写套餐介绍"
              show-word-limit
              maxlength="1000"
          />
        </el-form-item>
        <el-form-item label="套餐价格" prop="price">
          <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.price" placeholder="填写售卖价格" style="width:600px" ></el-input>
        </el-form-item>
        <el-form-item label="上网流量" prop="data">
          <el-input
              v-model="formData.data"
              style="width: 600px"
              :rows="3"
              type="textarea"
              placeholder="请填写套餐上网流量"
              show-word-limit
              maxlength="300"
          />
        </el-form-item>
        <el-form-item label="通话量" prop="talk_time">
          <el-input
              v-model="formData.talk_time"
              style="width: 600px"
              :rows="3"
              type="textarea"
              placeholder="请填写套餐通话量"
              show-word-limit
              maxlength="300"
          />
        </el-form-item>
        <el-form-item label="信息" prop="mns">
          <el-input
              v-model="formData.mns"
              style="width: 600px"
              :rows="3"
              type="textarea"
              placeholder="请填写套餐信息量"
              show-word-limit
              maxlength="300"
          />
        </el-form-item>
        <el-form-item label="附加服务" prop="other">
          <el-input
              v-model="formData.other"
              style="width: 600px"
              :rows="3"
              type="textarea"
              placeholder="请填写套餐附加服务信息"
              show-word-limit
              maxlength="300"
          />
        </el-form-item>
        <el-form-item label="合约期间" prop="agreement">
          <el-input
              v-model="formData.agreement"
              style="width: 600px"
              :rows="3"
              type="textarea"
              placeholder="请填写套餐合约期间"
              show-word-limit
              maxlength="300"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
              v-model="formData.status"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="热门商品">
          <el-switch
              v-model="formData.hot"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="排序" prop="ranking">
            <el-input-number v-model="formData.ranking"></el-input-number>
        </el-form-item>
      </el-form>
   </Drawer>
</template>

<style scoped lang="scss">
.bottomPage{
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>