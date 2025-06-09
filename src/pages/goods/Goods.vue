<script setup>
import SearchItem from "@/components/SearchItem.vue";

defineOptions({
  name: 'Goods',
})
import Search from "@/components/Search.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import Drawer from "@/components/Drawer.vue";
import CheckImg from "@/components/CheckImg.vue";
import {ref} from "vue";
import {showMessage} from "@/composables/utill.js";
import {goodsList,createGoods,deleteGoods,deleteAll,updateGoods,updateStatus,updateStatusAll,updateBanners} from "@/api/goods/goods.js";
import {listTrees,menuListTrees,orderTrees} from "@/composables/useCommon.js";
import useSpecData from "@/store/spec.js";
const {storageData} = useSpecData();
const firstList = ref(1);
//필요한데이터
const deliverys = ref([]);
const goodsCategorys = ref([]);
const goodsColors = ref([]);
const goodsSpecs = ref([]);
const labels = ref([]);
const models = ref([]);
const services = ref([]);
const tableList = ref([]);
const {
  searchForm,
  resetSearchForm,
  loading,
  currentPage,
  total,
  limit,
  getData,
  multipleTableRef,
  handleStatusChange,
  handleDelete,
  handleSelectionChange,
  handleStatusChangeAll,
  handleDeleteAll,
} = useInitTable({
  defaultSearchForm:{
    title1:"",
    category_id:"",
    model:"",
    type:"",
    isCheck:1
  },
  afterDataList:(res)=>{
    tableList.value = res.list;
    tableList.value.forEach((item)=>{
      item.banner = JSON.parse(item.banner);
      item.service = JSON.parse(item.service);
      item.delivery = JSON.parse(item.delivery);
    })
    if(firstList.value < 2){
      deliverys.value = res.delivery;
      services.value = res.service;
      goodsColors.value = res.goodsColor;
      labels.value = res.label;
      goodsSpecs.value = listTrees(res.goodsSpec,'spec_id','child',0,(item)=>{
        item.model = item.model ? item.model : item.name;
        return true;
      });
      models.value =listTrees(res.model,'pid','child',0,(item)=>{
        item.name = item.name ? item.name : item.menu;
        return true;
      });
      goodsCategorys.value = listTrees(res.goodsCategory,'category_id');
    }
    searchForm.isCheck= firstList.value+1;
    firstList.value = firstList.value+1;
  },
  getList:goodsList,
  updateStatus:updateStatus,
  delete:deleteGoods,
  deleteAll:deleteAll,
  updateStatusAll:updateStatusAll,
});
const{
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
    category_id:"",
    model:'',
    service:[],
    label:"",
    type:1,
    title:"",
    title1:"",
    img:"",
    banner:[],
    content:"",
    price:"",
    price1:"",
    price2:"",
    price3:"",
    color:"",
    storage:"",
    status:1,
    delivery:[],
    order:50,
    spec_id:"",
    phone_detail:"",
    isShop:"公司所属",
  },
  rules:{
    category_id:{
      required: true,
      message:"选择商品分类",
      trigger:"change"
    },
    model:{
      required: true,
      message:'选择商品型号',
      trigger:"change"
    },
    type:{
      required: true,
      message:'选择商品类型',
      trigger:"change"
    },
    title1:{
      required: true,
      message:"填写详细商品名称",
      trigger:"blur"
    },
  },
  create:createGoods,
  update:updateGoods,
  getDataList:getData,
});
getData();
//모델타입
const modelTypeOption = [
  {label:'全部',value:""},
  {label:'新手机',value:1},
  {label:'开封商品',value:2},
  {label:'二手机',value:3}
]
//입력,선택여부 결정
const isColor = ref(1);
const isStorage = ref(1);
const statusMap = {
  1: '合约新机',
  2: '开封合约机',
  3: '新专柜机',
  4: '开封专柜机',
  5: '二手商品',
};
const shopStatusMap = (type)=>{
  return  statusMap[type] ?  statusMap[type] : '无符合商品';
}
//배너수정부분
const banner = ref({
  id:"",
  banner:[]
})
const bannerDrawerRef =ref("");
const bannerFormRef = ref("");
const openBannerDrawer = (row)=>{
  banner.value = {id:row.id,banner:row.banner};
  bannerDrawerRef.value.openDrawer();
}
const updateBanner = ()=>{
  updateBanners(banner.value.id,banner.value.banner).then(res=>{
    showMessage("轮播图-修改成功");
    getData();
    bannerDrawerRef.value.closeDrawer();
  }).finally(()=>{
    bannerDrawerRef.value.closeDrawer();
  })
}
</script>
<template>
  <el-card>
    <div style="margin-bottom: 15px">
      <el-button type="primary" size="large" @click="handleCreate">添加商品</el-button>
    </div>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <search-item label="商品标题">
        <el-input v-model="searchForm.title1" placeholder="填写详细标题"></el-input>
      </search-item>
      <template #show>
        <SearchItem label="商品分类">
          <el-cascader
              v-model="searchForm.category_id"
              :options="goodsCategorys"
              :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
              placeholder="请选择商品分类"
              style="width: 330px"
          />
        </SearchItem>
        <SearchItem label="商品名称">
          <el-cascader
              v-model="searchForm.model"
              :options="models"
              :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
              placeholder="请选择商品"
              style="width: 330px"
          />
        </SearchItem>
        <SearchItem label="商品类型">
          <el-select v-model="searchForm.type" placeholder="选择商品类型" style="width: 330px">
            <el-option
                v-for="item in modelTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </SearchItem>
      </template>
    </Search>
    <div class="headerMenu">
      <el-button plain>全部商品</el-button>
      <el-button type="primary" plain round>出售商品</el-button>
      <el-button type="info" plain round>暂售商品</el-button>
      <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="#626AEF"
          title="确定选项商品下架吗？"
          @confirm="handleStatusChangeAll(0)"
      >
        <template #reference>
          <el-button color="#626aef" type="danger">批量下架</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="#626AEF"
          title="确定选项商品删除吗？"
          @confirm="handleDeleteAll"
      >
        <template #reference>
          <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>

    </div>
    <el-table
        :data="tableList"
        v-loading="loading"
        style="width: 100%"
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="expand" width="50">
        <template #default="{row}">
          <div>
            <p>商品名称: {{row.title}}</p>
            <p>详细名称: {{row.title1}}</p>
            <p>商品状态: {{shopStatusMap(row.type)}}</p>
            <p>市场价格: {{row.title}}</p>
            <p>商品价格: {{row.title}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="300" label="商品">
        <template #default="{row}">
          <div class="detail">
            <div class="detailLeft">
              <el-image
                  style="width: 80px; height: 80px;"
                  :src="row.img"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[row.img]"
                  show-progress
                  fit="cover"
              />
            </div>
            <div class="detailRight">
              <p class="detailRight1">{{row.title1}}</p>
              <p class="detailRight2">{{row.label}}</p>
              <p class="detailRight3">{{shopStatusMap(row.type)}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品配置"  align="center" width="200">
        <template #default="{row}">
          <div>
            <p><el-button style="width:120px" type="primary" plain>{{row.storage}}</el-button></p>
            <p style="margin-top: 10px"><el-button style="width:120px" type="danger" plain>{{JSON.parse(row.color).color}}</el-button></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" align="center" width="200">
        <template #default="{row}">
          <p v-if="row.status == 1">
            <el-button color="#626aef">出售商品</el-button>
          </p>
          <p v-else>
            <el-button color="#626aef" disabled>暂销商品</el-button>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="更改状态" align="center" width="230">
        <template #default="{row}">
          <el-switch @change="handleStatusChange(row.status,row)" v-model="row.status" active-text="上架" inactive-text="下架" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{row}">
          <el-button @click="handleUpdate(row)" type="primary" text bg>修改</el-button>
          <el-button @click="openBannerDrawer(row)" type="primary" text bg>更改轮播图</el-button>
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
      <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        :model="formData"
        :rules="formRules"
        label-width="auto"
        ref="formRef"
    >
      <el-form-item label="商品分类" prop="category_id">
        <el-cascader
            v-model="formData.category_id"
            :options="goodsCategorys"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择商品分类"
            style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="商品" prop="model">
        <el-cascader
            v-model="formData.model"
            :options="models"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择商品"
            style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="服务">
        <el-checkbox-group v-model="formData.service">
          <el-checkbox v-for="item in services" :key="item.id" :value="{title:item.title,description:item.description}" :label="item.title" border ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="购买方式">
        <el-checkbox-group v-model="formData.delivery">
          <el-checkbox v-for="item in deliverys" :key="item.id" :value="{title:item.title,description:item.description}" :label="item.title" border ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
            v-model="formData.label"
            clearable
            placeholder="请选择标签"
            style="width: 300px"
        >
          <el-option
              v-for="item in labels"
              :key="item.id"
              :label="item.name"
              :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商品类型" prop="type">
        <el-radio-group v-model="formData.type" size="large">
          <el-radio-button label="新合约机" :value="1" />
          <el-radio-button label="开封合约机" :value="2" />
          <el-radio-button label="新专柜机" :value="3" />
          <el-radio-button label="开封专柜机" :value="4" />
          <el-radio-button label="二手商品" :value="5" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品详细">
        <el-input v-model="formData.title" placeholder="请填写标题详细" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="详细标题" prop="title1">
        <el-input v-model="formData.title1" placeholder="请填写详细标题" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="详细URL">
        <el-input v-model="formData.content" placeholder="请填写详细信息URL" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="主图">
        <CheckImg v-model="formData.img"></CheckImg>
      </el-form-item>
      <el-form-item label="轮播详细图">
        <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
      </el-form-item>
      <el-form-item label="市场原价">
        <el-input v-model="formData.price" placeholder="填写市场原价" style="width: 80%" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="售卖价格">
        <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.price1" placeholder="填写售卖价格" style="width: 80%" ></el-input>
      </el-form-item>
      <el-form-item label="选择参数" v-if="formData.type != 5">
        <el-cascader
            v-model="formData.spec_id"
            :options="goodsSpecs"
            :props="{value:'id',label:'model',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择参数"
            style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="颜色">
        <el-radio-group v-model="isColor" size="large">
          <el-radio-button label="选项" :value="1" />
          <el-radio-button label="填写" :value="2" />
        </el-radio-group>
        <el-select
            v-if="isColor == 1"
            v-model="formData.color"
            clearable
            placeholder="请选择颜色"
            style="width: 300px;margin-left: 15px"
        >
          <el-option
              v-for="item in goodsColors"
              :key="item.id"
              :label="item.color"
              :value="JSON.stringify({color:item.color,english:item.english,code:item.code})"
          />
        </el-select>
        <el-input v-else v-model="formData.color" placeholder="填写颜色" style="width: 300px;margin-left: 15px"> </el-input>
      </el-form-item>
      <el-form-item label="内存">
        <el-radio-group v-model="isStorage" size="large">
          <el-radio-button label="选项" :value="1" />
          <el-radio-button label="填写" :value="2" />
        </el-radio-group>
        <el-select
            v-if="isStorage == 1"
            v-model="formData.storage"
            clearable
            placeholder="请选择内存"
            style="width: 300px;margin-left: 15px"
        >
          <el-option
              v-for="item in storageData"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
        <el-input v-else v-model="formData.storage" placeholder="填写内存" style="width: 300px; margin-left:15px;"> </el-input>
      </el-form-item>
      <el-form-item label="二手说明" v-if="formData.type == 5">
        <el-input
            v-model="formData.phone_detail"
            maxlength="500"
            :rows="6"
            style="width: 500px"
            placeholder="填写二手手机详细说明"
            show-word-limit
            type="textarea"
        />
      </el-form-item>
      <el-form-item label="商品所属" v-if="formData.type == 5">
        <el-radio-group v-model="formData.isShop" size="large">
          <el-radio-button label="公司所属" value="公司所属" />
          <el-radio-button label="卖家寄托" value="卖家寄托" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="formData.order"/>
      </el-form-item>
    </el-form>
  </Drawer>
  <Drawer ref="bannerDrawerRef" title="修改轮播图-图片" @submit="updateBanner">
    <el-form
        v-model="banner"
        ref="bannerFormRef"
        label-width="auto"
    >
      <el-form-item>
        <CheckImg v-model="banner.banner" :limit="20"></CheckImg>
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
.headerMenu{
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
}
.detail{
  display: flex;
  align-items: center;
  justify-content: left;
  .detailRight{
    margin-left: 15px;
    .detailRight1{
      color: rgb(120,120,120);
      font-size: 12px;
    }
    .detailRight2{
      height: 18px;
      width: 80px;
      font-size: 11px;
      line-height: 18px;
      background-color: #ff4949;
      color: white;
      text-align: center;
      border-radius: 5px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    .detailRight3{
      height: 18px;
      width: 80px;
      line-height: 18px;
      font-size: 11px;
      background-color: black;
      color: #E1D200;
      text-align: center;
      border-radius: 5px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
  }
}
</style>