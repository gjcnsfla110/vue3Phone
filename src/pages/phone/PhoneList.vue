<script setup>
  import {useInitTable,useInitFrom,priceDollar} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import Dialong from "@/components/Dialong.vue";
  import {getPhoneList,createPhone,updatePhone,updateStatus,itemDetail,deletePhone,updateBanners,updateHot} from "@/api/phone/phoneList.js";
  import {phonePlanList,createPhonePlan,updatePhonePlan,deletePhonePlan} from "@/api/phone/phonePlan.js";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";
  import CheckImg from "@/components/CheckImg.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {reactive, ref, watch} from "vue";
  import {listTrees, showMsg} from "@/composables/utill.js";
  import {showMessage} from "@/composables/utill.js";

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
    changeHot,
    handleDelete,
  }= useInitTable({
    defaultSearchForm:{
        title:"",
        category_id:"",
        mobile:"",
        hot:""
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
    updateHot,
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
      category_id:"",
      planCategory_id:"",
      mobile:"",
      hot:0,
      title:"",
      content:"",
      color:"",
      detail:"",
      img:"",
      store:"",
      banner:[],
      price:"",
      shopCashSupport:"",
      phoneCashSupport:"",
      sale_price:"",
      month_price:"",
      status:1,
      ranking:50
    },
    rules:{
      category_id:{
        required: true,
        message:"选择主菜单",
        trigger:"change"
      },
      planCategory_id:{
        required: true,
        message:"选择套餐菜单",
        trigger:"change"
      },
      mobile:{
        required: true,
        message:"选择信用卡通信社",
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
      shopCashSupport: {
        required: true,
        message: "填写手机价格",
        trigger: "blur"
      }
    },
    getDataList:getData,
    create:createPhone,
    update:updatePhone,
  })
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

  /**
   * 아래부분은 상세페이지 보여주는 부분입니다.
   */
  const itemDialongRef = ref("");
  //자세히 보기 객체
  const agreementItem = ref("");
  const agreementPlans = ref([]);
  //자세히보기 보여주기함수
  const detailCloseDialong = ()=>{
    itemDialongRef.value.closeDialog();
  }
  const detailPage = (id)=>{
      itemDialongRef.value.openDialog()
      itemDetail(id).then(res=>{
        agreementItem.value = res.item[0];
        agreementPlans.value = res.plans;
      })
  };
  //----------------------------------------------아래부분은 요금제정보 전체 부분입니다-------------------------------------------------------------------------------//

  //dialong ref 입니다
  const dialongRef = ref("");
  const plans = ref([]);
  const planList = ref([]);
  //계약상품아이디
  const agreementId = ref("");
  //카테고리 값 갖고와야할지 여부
  const isCheckPlans = ref("");
  //요금카테고리 아이디
  const planCategoryId = ref("");
  const getPlan = (id,planCategory_id)=>{
      dialongRef.value.openDialog();
      agreementId.value=id;
      if(plans.value.length === 0){
          isCheckPlans.value=1;
      }else {
          isCheckPlans.value=0;
      }
      planCategoryId.value = planCategory_id;
      phonePlanList(planCategoryId.value,isCheckPlans.value,agreementId.value).then(res=>{
           if(isCheckPlans.value){
              plans.value=res.plans;
              plans.value.unshift({id:0,title:"직접입력",detail:"",price:""});
           }
           planList.value = res.list;
      })
  }

  //-------------------------------------------------------계약폰요금제 추가---------------------------------------------------------------------------------------------------//
  const addPlanDialong = ref();
  // select 로 선택한 요금제 아이디
  const planId = ref();
  //제일앞에 요금제를 선택시 입력되는값
  const changePlan = ()=>{
      let planValue = plans.value.filter(item=>item.id == planId.value);
      if(planId.value){
        planForm.title=planValue[0].title;
      }else{
        planForm.title="";
      }
      planForm.detail=planValue[0].detail;
      planForm.price=planValue[0].price;
  }
  const planFormRef = ref("");
  const planForm = reactive({
      agreement_id:"",
      title:"",
      detail:"",
      price:"",
      phone_sale:"",
      ranking:50
  });
  //초기화 planForm
  const defaultPlanForm = {
      agreement_id:"",
      title:"",
      detail:"",
      price:"",
      phone_sale:"",
      ranking:50
  };
  const planRules = ref({
      title:{
        required: true,
        message:"요금제명을 작성하세요",
        trigger:"blur"
      },
      detail:{
        required: true,
        message:"요금제 소개를 작성해주세요",
        trigger:"blur"
      },
      price:{
        required: true,
        message:"요금 가격을 입력해주세요",
        trigger:"blur"
      },
      phone_sale:{
        required: true,
        message:"공시지원금을 입력해주세요",
        trigger:"blur"
      }
  });

  //업데이트 수정 요금제 아이디
  const updatePlanId = ref();
  //검증 및 데이텁입력 ,업데이트 -- submit 부분
  const submitCreatePlan = ()=>{
    planFormRef.value.validate((valid)=>{
      if(!valid) return;
      let submit = updatePlanId.value ? updatePhonePlan(updatePlanId.value,planForm) : createPhonePlan(planForm);
      submit.then((res)=>{
        showMsg("成功");
        phonePlanList(planCategoryId.value,isCheckPlans.value,agreementId.value).then(res=>{
          if(isCheckPlans.value){
            plans.value=res.plans;
            plans.value.unshift({id:0,title:"직접입력",detail:"",price:""});
          }
          planList.value = res.list;
        });
        addPlanDialong.value.closeDialog();
      }).finally(()=>{
        addPlanDialong.value.closeDialog();
      })
    });
  }

  /**
   * 데이터 추가부분
   */
  const createPlan = ()=>{
    resetFormData(defaultPlanForm);
    planForm.agreement_id = agreementId.value;
    addPlanDialong.value.openDialog();
  }
  /**
   * 修改
   */
  const updatePlan = (row)=>{
    updatePlanId.value = row.id;
    resetFormData(row);
    addPlanDialong.value.openDialog();
  }

  /**
   * 初始化form
   * */
  const resetFormData = (data = false)=>{
    if(planFormRef.value) planFormRef.value.clearValidate();
    for(const key in defaultPlanForm){
      planForm[key] = data[key];
    }
  }

  const deletePlan = (id)=>{
      deletePhonePlan(id).then((res)=>{
        showMsg("删除成功");
        phonePlanList(planCategoryId.value,1,agreementId.value).then(res=>{
          planList.value = res.list;
        })
      })
  }
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem label="主菜单">
        <el-cascader
            v-model="searchForm.category_id"
            :options="categorys"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="选择菜单"
            @change="checkSearchCategoryId"
        />
      </SearchItem>
      <SearchItem label="热门通信社商品">
        <el-select v-model="searchForm.mobile" placeholder="热门通信社商品" style="width: 240px">
          <el-option
              v-for="item in [{label:'LG_通信社',value:1},{label:'KT_通信社',value:2},{label:'SK_通信社',value:3}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
       <el-table-column label="通信社" align="center" width="150" >
         <template #default="{row}">
           <el-button v-if="row.mobile == 1" type="danger" >LG_通信社</el-button>
           <el-button v-if="row.mobile == 2" type="primary" >KT_通信社</el-button>
           <el-button v-if="row.mobile == 3" type="warning" >SK_通信社</el-button>
           <el-button v-if="row.mobile == 4" type="danger" >LG_网线</el-button>
           <el-button v-if="row.mobile == 5" type="primary" >KT_网线</el-button>
           <el-button v-if="row.mobile == 6" type="warning" >SK_网线</el-button>
           <el-button v-if="row.mobile == 7" type="danger" >알뜰LG网线</el-button>
           <el-button v-if="row.mobile == 8" type="primary" >알뜰KT网线</el-button>
           <el-button v-if="row.mobile == 9" type="warning" >알뜰SK网线</el-button>
         </template>
       </el-table-column>
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
                 <p style="margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 8px">价格 : {{priceDollar(row.price)}} 원</p>
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
      <el-table-column label="热门" width="150" align="center">
        <template #default="{row}">
          <el-switch
              v-model="row.hot"
              active-text="热门"
              inactive-text="正常"
              width="40px"
              :active-value="1"
              :inactive-value="0"
              @change="changeHot($event,row)"
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
           <el-button type="warning" @click="getPlan(row.id,row.planCategory_id)">套餐</el-button>
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
          <el-button type="success" round size="small" @click="detailPage(row.id)" plain>查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
      <el-pagination @change="getData" background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
     :model="formData"
     :rules="formRules"
     ref="formRef"
     label-width="auto">
       <el-form-item label="主菜单" prop="category_id">
         <el-cascader
             v-model="formData.category_id"
             :options="categorys"
             :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
             placeholder="必须选择主菜单"
         />
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
       <el-form-item label="通信社">
         <el-radio-group v-model="formData.mobile" size="large">
           <el-radio-button label="LG通信社" :value="1"/>
           <el-radio-button label="KT通信社" :value="2"/>
           <el-radio-button label="SK通信社" :value="3"/>
           <el-radio-button label="LG网线" :value="4"/>
           <el-radio-button label="KT网线" :value="5"/>
           <el-radio-button label="SK网线" :value="6"/>
           <el-radio-button label="알뜰LG网线" :value="7"/>
           <el-radio-button label="알뜰KT网线" :value="8"/>
           <el-radio-button label="알뜰SK网线" :value="9"/>
         </el-radio-group>
       </el-form-item>
       <el-form-item label="信用卡优惠">
         <el-radio-group v-model="formData.hot" size="large">
           <el-radio-button label="正常" :value="0"/>
           <el-radio-button label="热门" :value="1"/>
         </el-radio-group>
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
       <el-form-item label="内存" style="width: 700px">
         <el-input v-model="formData.store" placeholder="填写商品内存"></el-input>
       </el-form-item>
       <el-form-item label="主图">
         <CheckImg v-model="formData.img" ></CheckImg>
       </el-form-item>
       <el-form-item label="轮播详细图">
         <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
       </el-form-item>
       <el-form-item style="width: 700px" label="价格" >
            <el-input v-model="formData.price" placeholder="填写价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="现金支援" prop="shopCashSupport" style="width: 700px">
         <el-input v-model="formData.shopCashSupport" placeholder="填写现金支援价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                   :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="공시지원금"  style="width: 700px">
         <el-input v-model="formData.phoneCashSupport" placeholder="填写공시지원금"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                   :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="优惠后价格" style="width: 700px">
         <el-input  v-model="formData.sale_price" placeholder="填写优惠完后价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                   :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="最低每月话费" style="width: 700px">
         <el-input  v-model="formData.month_price" placeholder="填写优惠完后价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
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
  <Dialong ref="dialongRef" title="话费套餐">
    <el-button type="danger" @click="createPlan">添加</el-button>
    <h1 style="text-align: center;margin-bottom: 30px; font-size: 20px; color: rgb(60,60,60);">合 约 机 套 餐</h1>
     <el-card style="padding: 50px">
          <el-table
          :data="planList">
              <el-table-column label="요금제명" prop="title" width="300">
              </el-table-column>
              <el-table-column label="요금제가격" width="230" align="center">
                <template #default="{row}">
                  {{priceDollar(row.price)}} 원
                </template>
              </el-table-column>
              <el-table-column label="공시지원금" width="230" align="center">
                <template #default="{row}">
                  {{priceDollar(row.phone_sale)}} 원
                </template>
              </el-table-column>
              <el-table-column label="설정" align="center">
                <template #default="{row}">
                  <el-button @click="updatePlan(row)" type="primary" text bg>修改</el-button>
                  <el-popconfirm
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      icon-color="#626AEF"
                      title="确定删除吗？"
                      @confirm="deletePlan(row.id)"
                  >
                    <template #reference>
                      <el-button type="danger" text bg>删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
          </el-table>
     </el-card>
  </Dialong>

  <Dialong ref="addPlanDialong" title="添加套餐" @submit="submitCreatePlan" width="80%" height="30%" top="25vh">
        <el-form
         :model="planForm"
         :rules="planRules"
         ref="planFormRef"
         :inline="true"
         class="demo-form-inline"
        >
            <el-form-item>
              <el-select
                  v-model="planId"
                  placeholder="选择套餐"
                  style="width: 220px"
                  @change="changePlan"
              >
                <el-option
                    v-for="item in plans"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="요금" prop="title">
                <el-input v-model="planForm.title"></el-input>
            </el-form-item>
            <el-form-item prop="detail">
              <el-input v-model="planForm.detail" type="textarea" style="width: 450px"
                        placeholder="요금제 소개를 작성하세요"
                        show-word-limit maxlength="2000" :rows="6" ></el-input>
            </el-form-item>
            <el-form-item label="요금가격" prop="price">
              <el-input v-model="planForm.price" :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
            </el-form-item>
            <el-form-item label="공시지원금" prop="phone_sale">
              <el-input v-model="planForm.phone_sale" :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
            </el-form-item>
            <el-form-item label="우선순위">
              <el-input-number v-model="planForm.ranking"></el-input-number>
            </el-form-item>
        </el-form>
  </Dialong>
  <Dialong ref="itemDialongRef" title="계약상세보기" width="60%" height="60%" top="25vh" @submit="detailCloseDialong" :card="false">
      <el-card style="padding: 30px">
        <template #header>
          <div class="card-header">
            <h3>{{agreementItem.title}}</h3>
          </div>
        </template>
        <el-card shadow="hover" style="padding: 20px">
          <template #header><p style="font-size: 18px">제품상세내역</p></template>
          <p><el-image style="width: 300px; height: 300px" :src="agreementItem.img" fit="cover" /></p>
          <p style="color:rgb(150,150,150);margin-bottom: 20px; margin-top: 10px;">{{agreementItem.detail}}</p>
          <p style="margin-bottom: 8px;color:rgb(150,150,150)"><span style="margin-right:10px;color: red;font-size: 16px; font-weight: bold">제품색상 : </span>{{agreementItem.color}}</p>
          <p style="margin-bottom: 8px;color:rgb(150,150,150)"><span style="margin-right:10px;color:#3498db;font-size: 16px; font-weight: bold" >원가가격 : </span>{{priceDollar(agreementItem.price)}} 원</p>
          <p style="margin-bottom: 8px;color:rgb(150,150,150)"><span style="margin-right:10px;color:blueviolet;font-size: 16px; font-weight: bold">판매가격 : </span>{{agreementItem.sale_price}}</p>

        </el-card>
        <template #footer>
          <el-card shadow="hover" style="padding: 20px">
            <template #header><p style="font-size: 18px">요금제내역</p></template>
            <el-table
                :data="agreementPlans"
            >
              <el-table-column label="요금제명" prop="title" width="220"> </el-table-column>
              <el-table-column label="요금제가격" width="180" align="center">
                <template #default="{row}">
                  {{priceDollar(row.price)}} 원
                </template>
              </el-table-column>
              <el-table-column label="공시지원금" width="180" align="center">
                <template #default="{row}">
                  {{priceDollar(row.phone_sale)}} 원
                </template>
              </el-table-column>
              <el-table-column label="요금제소개" prop="detail" align="center"> </el-table-column>
            </el-table>
          </el-card>
        </template>
      </el-card>
  </Dialong>
</template>

<style scoped lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>