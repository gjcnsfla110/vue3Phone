<script setup>
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import Dialong from "@/components/Dialong.vue";
  import {getPhoneList,createPhone,updatePhone,updateStatus,itemDetail,deletePhone,updateBanners} from "@/api/phone/phoneList.js";
  import {phonePlanList,createPhonePlan,updatePhonePlan,deletePhonePlan} from "@/api/phone/phonePlan.js";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";
  import CheckImg from "@/components/CheckImg.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {onMounted, ref} from "vue";
  import {listTrees} from "@/composables/utill.js";
  import {showMessage} from "@/composables/utill.js";

  //검색시사용 선택한메인카테고리아이디
  const searchCategoryId = ref("");
  const searchSideCategory = ref([]);
  //입력시사용 선택한메인카테고리아이디
  const formCategoryId =ref("");
  const formSideCategory = ref([]);
  //category 메인카테고리 데이터
  const categorys = ref([]);
  //sideCategory 데이터
  const sideCategory = ref([]);
  //planCategory 데이터
  const planCategorys = ref([]);
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
  }= useInitTable({
    defaultSearchForm:{
        title:"",
        sideCategory_id:"",
    },
    afterDataList:(res)=>{
        dataList.value = res.list;
        dataList.value.forEach((item)=>{
          item.banner = JSON.parse(item.banner);
        })
        total.value = res.total;
        categorys.value = listTrees(res.categorys,'pid','child');
        sideCategory.value = res.sideCategorys;
        planCategorys.value = res.planCategorys;
    },
    getList: getPhoneList,
    updateStatus:updateStatus,
    delete:deletePhone,
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
      sideCategory_id:"",
      planCategory_id:"",
      title:"",
      content:"",
      color:"",
      detail:"",
      img:"",
      banner:[],
      price:"",
      sale_price:"",
      status:1,
      ranking:50
    },
    rules:{
      sideCategory_id:{
        required: true,
        message:"选择菜单",
        trigger:"change"
      },
      planCategory_id:{
        required: true,
        message:"选择套餐菜单",
        trigger:"change"
      },
      title:{
        required: true,
        message:"填写合约标题",
        trigger:"blur"
      },
      detail:{
        required: true,
        message:"填写合约内容",
        trigger:"blur"
      },
      color:{
        required: true,
        message:"填写机器颜色",
        trigger:"blur"
      },
      content:{
        required: true,
        message:"填写合约内容",
        trigger:"blur"
      },
      price:{
        required: true,
        message:"填写手机价格",
        trigger:"blur"
      },
      sale_price:{
        required: true,
        message:"填写优惠完后实价格",
        trigger:"blur"
      }
    },
    getDataList:getData,
    create:createPhone,
    update:updatePhone,
  })
  getData();

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
       formData.sideCategory_id = "";
       formSideCategory.value = selectSideCategory(formCategoryId.value);
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

  //----------------------------------------------아래부분은 요금제정보 전체 부분입니다-------------------------------------------------------------------------------//
  //dialong ref 입니다
  const dialongRef = ref("");
  const plans = ref(Array.from({length:30}),()=>({agreement_id:"",title:"",detail:"",price:"",sale_price:"",ranking:50}));
  const agreementId = ref("");
  const createPlan = (id,planCategory_id)=>{
      dialongRef.value.openDialog();
      agreementId.value=id;
      phonePlanList(planCategory_id).then(res=>{
          plans.value = res.list;
      })
  }
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem label="主菜单">
        <el-cascader
            v-model="searchCategoryId"
            :options="categorys"
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
      <SearchItem label="标题">
        <el-input v-model="searchForm.title" placeholder="填写标题"></el-input>
      </SearchItem>
    </Search>
    <el-table
    v-loading="loading"
    :data="dataList"
    >
       <el-table-column label="标题" prop="title" width="300"></el-table-column>
       <el-table-column label="图片" align="center" width="180">
         <template #default="{row}">
              <div>
                <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
              </div>
         </template>
       </el-table-column>
       <el-table-column label="价格" align="center" width="280">
          <template #default="{row}">
              <div>
                 <p style="margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 8px">价格 : {{row.price}}</p>
                 <p style="border-bottom: 1px solid #eee;padding-bottom: 8px">优惠后价格 : {{row.sale_price}}</p>
              </div>
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
      <el-table-column label="轮播图" align="center" width="200">
        <template #default="{row}">
           <el-button type="primary" round size="small" @click="openBannerDrawer(row)">查看图片</el-button>
        </template>
      </el-table-column>
      <el-table-column label="话费套餐" align="center" width="200" >
        <template #default="{row}">
           <el-button type="warning" @click="createPlan(row.id,row.planCategory_id)">套餐</el-button>
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
          <el-button type="success" round size="small" plain>查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
      <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
     :model="formData"
     :rules="formRules"
     ref="formRef"
     label-width="auto">
       <el-form-item label="主菜单">
         <el-cascader
             v-model="formCategoryId"
             :options="categorys"
             :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
             placeholder="必须选择主菜单"
             @change="checkFormCategoryId"
         />
       </el-form-item>
       <el-form-item label="菜单" prop="sideCategory_id">
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
       <el-form-item label="话费套餐" prop="planCategory_id">
         <el-select
             v-model="formData.planCategory_id"
             clearable
             placeholder="请选择话费菜单"
             style="width: 300px"
         >
           <el-option
               v-for="item in planCategorys"
               :key="item.id"
               :label="item.name"
               :value="item.id"
           />
         </el-select>
       </el-form-item>
       <el-form-item label="标题" prop="title" style="width: 700px">
           <el-input v-model="formData.title" placeholder="填写合约机标题"></el-input>
       </el-form-item>
       <el-form-item label="介绍" prop="detail" style="width: 700px">
           <el-input v-model="formData.detail" maxlength="1000"
                     placeholder="填写合约机内容"
                     :rows="8"
                     type="textarea">

           </el-input>
       </el-form-item>
       <el-form-item label="颜色" prop="color" style="width: 700px">
           <el-input v-model="formData.color" placeholder="填写合约机颜色"></el-input>
       </el-form-item>
       <el-form-item label="内容url" prop="content" style="width: 700px">
           <el-input v-model="formData.content" placeholder="填写合约机连接Url"></el-input>
       </el-form-item>
       <el-form-item label="主图">
         <CheckImg v-model="formData.img" ></CheckImg>
       </el-form-item>
       <el-form-item label="轮播详细图">
         <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
       </el-form-item>
       <el-form-item style="width: 700px" label="价格" prop="price">
            <el-input v-model="formData.price" placeholder="填写价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="优惠后价格" prop="sale_price" style="width: 700px">
            <el-input v-model="formData.sale_price" placeholder="填写优惠完后价格"></el-input>
       </el-form-item>
       <el-form-item label="状态">
         <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
       </el-form-item>
       <el-form-item label="排序">
         <el-input-number v-model="formData.ranking"></el-input-number>
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
  <Dialong ref="dialongRef" title="话费套餐" @submit="">
    <h1 style="text-align: center;margin-bottom: 30px; font-size: 20px; color: rgb(60,60,60);">合 约 机 套 餐</h1>
     <el-card style="padding: 50px">
          <el-table
          :data="plans">
              <el-table-column label="타이틀" prop="title" width="300">
                <template #default="{row}">
                    <el-input v-model="" disabled></el-input>
                </template>
              </el-table-column>
          </el-table>
     </el-card>
  </Dialong>
</template>

<style scoped lang="scss">

</style>