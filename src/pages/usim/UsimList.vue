<script setup>
import {useInitTable, useInitFrom, listTrees} from "@/composables/useCommon.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import {createUsim,updateUsim,updateStatus,updateHot,deleteUsim,getUsimList,oneDetail} from "@/api/usim/usimList.js";
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
  getData,
  handleStatusChange,
  handleDelete,
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
    'mobile_name':"LG公司",
    'mobile_type':"5G网络",
    'price':"",
    'data':"无限上网",
    'tell_time':"无限通话",
    'mns':"无限短信",
    'esim':"",
    'other_service':"",
    'agreement_time':"",
    'papers':"",
    'delivery':"",
    'phone_type':"",
    'peopleNeed':"",
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
    'mobile_name':{
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
    'tell_time':{
      required: true,
      message:"请填写套餐通话时间",
      trigger:"blur"
    },
    'mns':{
      required: true,
      message:"请填写套餐(MNS)信息",
      trigger:"blur"
    },
    'mobile_type':{
      required: true,
      message:"请选择套餐网络",
      trigger:"blur"
    },
    'other_service':{
      required: true,
      message:"请填写套餐附加服务",
      trigger:"blur"
    },
    'agreement_time':{
      required: true,
      message:"请填写套餐合约时间",
      trigger:"blur"
    },
    'papers':{
      required: true,
      message:"请填写套餐合约时间",
      trigger:"blur"
    },
    'phone_type':{
      required: true,
      message:"请填写可使用手机",
      trigger:"blur"
    },
    'peopleNeed':{
      required: true,
      message:"请填写适合人群",
      trigger:"blur"
    }
  }

});
getData();

const categoryName = (checkId)=>{
  return categoryList.value.find(item => item.id == categorys.value.find(item1 => item1.id == checkId)?.pid)?.name
      ? categoryList.value.find(item => item.id == categorys.value.find(item1 => item1.id == checkId)?.pid)?.name : "错误套餐";
}
const itemData = ref({});
const dialogVisible = ref(false);
const itemDetail= (id)=>{
  oneDetail(id).then(res=>{
    dialogVisible.value=true;
    itemData.value = res.item[0];
  });
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
              clearable
          />
        </SearchItem>
        <SearchItem label="通信社">
          <el-select clearable v-model="searchForm.mobile" placeholder="选择通信社" style="width: 330px">
            <el-option
                v-for="item in [{label:'LG-通信社',value:'LG公司'},{label:'KT-通信社',value:'KT公司'},{label:'SK-通信社',value:'SK公司'},
                                {label:'LG-알뜰통신',value:'LG알뜰통신'},{label:'KT-알뜰통신',value:'KT알뜰통신'},{label:'SK-알뜰통신',value:'SK알뜰통신'}]"
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
      <el-table-column label="套餐名称" align="center" width="300">
        <template #default="{row}">
          <p style="margin:8px 0; font-size:15px; color:rgb(160,160,160);">{{row.title}}</p>
          <el-button type="danger" size="small" round>{{row.mobile_name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="套餐类型" align="center" width="180">
        <template #default="{row}">
          <el-button color="#626aef" disabled plain>
            {{categoryName(row.category_id)}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="热门套餐" align="center" width="150">
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
      <el-table-column label="状态" width="150" align="center">
        <template #default="{row}">
          <el-switch
              v-model="row.status"
              :loading="row.statusLoding"
              active-text="正常"
              inactive-text="禁用"
              width="40px"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event,row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="其他" align="center">
        <template #default="{row}">
          <el-button type="primary" plain @click="handleUpdate(row)">修改</el-button>
          <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button
                  type="danger"
                  plain
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" link @click="itemDetail(row.id)">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottomPage">
      <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
    </div>
  </el-card>
  <el-dialog v-model="dialogVisible" :modal="false">
    <div
        style="width: 60vh; height: 60vh"
    >
      {{itemData}}
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button style="margin-right: 10px" size="large" type="primary" @click="dialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
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
      <el-form-item label="通信公司" prop="mobile_name">
        <el-radio-group v-model="formData.mobile_name" size="large" fill="#6cf">
          <el-radio-button label="LG-通信社" value="LG公司" />
          <el-radio-button label="KT-通信社" value="KT公司" />
          <el-radio-button label="SK-通信社" value="SK公司" />
          <el-radio-button label="LG-알뜰통신" value="LG알뜰통신" />
          <el-radio-button label="KT-알뜰통신" value="KT알뜰통신" />
          <el-radio-button label="SK-알뜰통신" value="SK알뜰통신" />
          <el-radio-button label="LG-선불통신" value="LG선불통신" />
          <el-radio-button label="KT-선불통신" value="KT선불통신" />
          <el-radio-button label="SK-선불통신" value="SK선불통신" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="通信公司" prop="mobile_type">
        <el-radio-group v-model="formData.mobile_type" size="large" fill="#6cf">
          <el-radio-button label="5G网络" value="5G网络" />
          <el-radio-button label="4G网络" value="4G网路" />
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
      <el-form-item label="通话量" prop="tell_time">
        <el-input
            v-model="formData.tell_time"
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
      <el-form-item label="Esim手机卡" prop="mobile_type">
        <el-radio-group v-model="formData.esim" size="large" fill="#6cf">
          <el-radio-button label="Esim可用" value="可用" />
          <el-radio-button label="Esim不可用" value="不可用" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="附加服务" prop="other_service">
        <el-input
            v-model="formData.other_service"
            style="width: 600px"
            :rows="3"
            type="textarea"
            placeholder="请填写套餐附加服务信息"
            show-word-limit
            maxlength="300"
        />
      </el-form-item>
      <el-form-item label="合约期间" prop="agreement_time">
        <el-input
            v-model="formData.agreement_time"
            style="width: 600px"
            :rows="3"
            type="textarea"
            placeholder="请填写套餐合约期间"
            show-word-limit
            maxlength="300"
        />
      </el-form-item>
      <el-form-item label="开通需材料" prop="papers">
        <el-input
            v-model="formData.papers"
            style="width: 600px"
            :rows="3"
            type="textarea"
            placeholder="请填写需要的材料"
            show-word-limit
            maxlength="300"
        />
      </el-form-item>
      <el-form-item label="可使用手机" prop="phone_type">
        <el-input
            v-model="formData.phone_type"
            style="width: 600px"
            :rows="3"
            type="textarea"
            placeholder="请填写可用的手机"
            show-word-limit
            maxlength="300"
        />
      </el-form-item>
      <el-form-item label="适合人群" prop="peopleNeed">
        <el-input
            v-model="formData.peopleNeed"
            style="width: 600px"
            :rows="8"
            type="textarea"
            placeholder="请填写套餐介绍"
            show-word-limit
            maxlength="1000"
        />
      </el-form-item>
      <el-form-item label="邮费" prop="delivery">
        <el-input style="width: 600px" v-model="formData.delivery" placeholder="请填写运送邮费"></el-input>
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