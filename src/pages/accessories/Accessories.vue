<script setup>
import SearchItem from "@/components/SearchItem.vue";

defineOptions({
  name: 'Accessories',
})
import Search from "@/components/Search.vue";
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import Drawer from "@/components/Drawer.vue";
import CheckImg from "@/components/CheckImg.vue";
import {ref, watch} from "vue";
import {showMessage} from "@/composables/utill.js";
import {AccessoriesList,createAccessories,updateAccessories,deleteAccessories,deleteAll,updateBanners,updateStatus,updateStatusAll} from "@/api/accessories/accessories.js";
import {listTrees,menuListTrees,orderTrees} from "@/composables/useCommon.js";

const firstList = ref(1);
//필요한데이터
const accessoriesCategorys = ref([]);
const accessoriesColors = ref([]);
const labels = ref([]);
const tableList = ref([]);
//sideCategory 데이터
const sideCategory = ref([]);
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
    title:"",
    sideCategory_id:"",
    isCheck:1
  },
  afterDataList:(res)=>{
    tableList.value = res.list;
    total.value = res.total;
    tableList.value.forEach((item)=>{
      item.banner = JSON.parse(item.banner);
    })
    if(firstList.value < 2){
      labels.value = res.label;
      accessoriesCategorys.value = listTrees(res.categorys,'pid');
      sideCategory.value = res.sideCategorys;
    }
    searchForm.isCheck= firstList.value+1;
    firstList.value = firstList.value+1;
  },
  getList:AccessoriesList,
  updateStatus:updateStatus,
  delete:deleteAccessories,
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
    sideCategory_id:"",
    label:"",
    label_color:"",
    title:"",
    accessories_detail:"",
    img:"",
    banner:[],
    price:"",
    sale_price:"",
    color:"",
    status:1,
    order:50,
  },
  rules:{
    category_id:{
      required: true,
      message:"选择商品分类",
      trigger:"change"
    },
    sideCategory_id:{
      required: true,
      message:"选择商品分类",
      trigger:"change"
    },
    title:{
      required: true,
      message:"填写商品名称",
      trigger:"blur"
    },
    price:{
      required: true,
      message:"填写商品价格",
      trigger:"blur"
    }
  },
  create:createAccessories,
  update:updateAccessories,
  getDataList:getData,
});
getData();

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

//주메뉴-서브메뉴 부분코딩

//검색시사용 선택한메인카테고리아이디
const searchCategoryId = ref("");
const searchSideCategory = ref([]);
//입력시사용 선택한메인카테고리아이디
const formSideCategory = ref([]);

//sideCategory 를 선택하는 고르는 함수
const selectSideCategory = (id)=>{
  return sideCategory.value.filter((item)=>item.category_id == id);
}

//검색 카테고리선택 함수
const checkSearchCategoryId = ()=>{
  searchForm.sideCategory_id = "";
  searchSideCategory.value = selectSideCategory(searchCategoryId.value);
}

//입력폼 카테고리선택 함수
const checkFormCategoryId = ()=>{
  //formData.sideCategory_id = "";
  formSideCategory.value = selectSideCategory(formData.category_id);
}
//입력폼 변화감지
watch(
    () => formData.category_id,
    (newValue, oldValue) => {
      checkFormCategoryId();
    },
    { immediate: true } // 초기값 설정 시에도 실행
);
const changeLabel = (labelName)=>{
  let item = labels.value.find((item)=>item.name == labelName);
  formData.label_color = item.color;
}
</script>
<template>
  <el-card>
    <div style="margin-bottom: 15px">
      <el-button type="primary" size="large" @click="handleCreate">添加商品</el-button>
    </div>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <search-item label="商品标题">
        <el-input v-model="searchForm.title" placeholder="填写详细标题"></el-input>
      </search-item>
      <template #show>
        <SearchItem label="主菜单">
          <el-cascader
              v-model="searchCategoryId"
              :options="accessoriesCategorys"
              :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
              placeholder="必选主菜单才可选菜单"
              @change="checkSearchCategoryId"
          />
        </SearchItem>
        <SearchItem label="菜单">
          <el-select
              v-model="searchForm.sideCategory_id"
              clearable
              placeholder="请选择标签"
              style="width: 300px"
          >
            <el-option
                v-for="item in searchSideCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
            <p>详细名称: {{row.accessories_detail}}</p>
            <p>市场价格: {{row.price}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="300" label="商品">
        <template #default="{row}">
          <div class="detail">
            <div class="detailLeft">
              <el-image
                  style="width: 80px; height: 80px; z-index: 1000;"
                  :src="row.img"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[row.img]"
                  :preview-teleported="true"
                  show-progress
                  fit="cover"
              />
            </div>
            <div class="detailRight">
              <p class="detailRight1">{{row.title}}</p>
              <p class="detailRight2">{{row.label}}</p>
            </div>
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
              title="确定删除手机配件吗？"
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
      <el-pagination @change="getData"  background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        :model="formData"
        :rules="formRules"
        label-width="auto"
        ref="formRef"
    >
      <el-form-item label="主分类" prop="category_id">
        <el-cascader
            v-model="formData.category_id"
            :options="accessoriesCategorys"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择商品分类"
            style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="副菜单" prop="sideCategory_id">
        <el-select
            v-model="formData.sideCategory_id"
            clearable
            placeholder="请选择菜单"
            style="width: 300px"
        >
          <el-option
              v-for="item in formSideCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
            v-model="formData.label"
            clearable
            placeholder="请选择标签"
            style="width: 300px"
            @change="changeLabel"
        >
          <el-option
              v-for="item in labels"
              :key="item.id"
              :label="item.name"
              :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="商品标题" prop="title">
        <el-input v-model="formData.title" placeholder="请填写标题详细" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="商品说明">
        <el-input
            v-model="formData.accessories_detail"
            maxlength="500"
            :rows="6"
            style="width: 80%"
            placeholder="填写二手手机详细说明"
            show-word-limit
            type="textarea"
        />
      </el-form-item>
      <el-form-item label="颜色">
        <el-input v-model="formData.color" placeholder="填写颜色" style="width: 80%"> </el-input>
      </el-form-item>
      <el-form-item label="市场原价">
        <el-input v-model="formData.price" placeholder="填写市场原价" style="width: 80%" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="优惠价格">
        <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.sale_price" placeholder="填写二手价格" style="width: 80%" ></el-input>
      </el-form-item>
      <el-form-item label="主图">
        <CheckImg v-model="formData.img"></CheckImg>
      </el-form-item>
      <el-form-item label="轮播详细图">
        <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
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
        :model="banner"
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