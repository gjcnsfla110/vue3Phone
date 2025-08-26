<script setup>

import ListHeader from "@/components/ListHeader.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {useInitTable,useInitFrom,priceDollar} from "@/composables/useCommon.js";
import {getComponentList,createComponent,updateComponent,deleteComponent,updateStatus} from "@/api/main/component.js";
import {getComponentItemList,createComponentItem,deleteComponentItem,getGoods} from "@/api/main/componentItem.js";
import ComponentBanner from "@/pages/main/ComponentBanner.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
import CheckImg from "@/components/CheckImg.vue";
import Dialong from "@/components/Dialong.vue";
import CheckGoods from "@/components/CheckGoods.vue";
import { h } from 'vue'
import { ElLink } from 'element-plus'
import {showMsg} from "@/composables/utill.js";

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
      componentNames.value = res.componentNames;
      total.value = res.total;
      dataList.value = res.list;
  },
  getList:getComponentList,
  updateStatus:updateStatus,
  delete:deleteComponent,
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
    page_key:"",
    component:"",
    title:"",
    title1:"",
    component_left_title:"",
    component_right_title:"",
    content_title:"",
    content_title1:"",
    more:0,
    more_link:"",
    list:[],
    list1:[],
    img:"",
    top_img:"",
    banner:0,
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

/*----------------------------------------------아이템 부분----------------------------------------------------------------------------*/
//아이템 보기
const clickItemId = ref("");
const addItem = ref("");
const checkItems = ref("");//체크아이템즈
//컴포넌트 아이템
const componentItems = ref([]);
//타이틀 ... 표시해주는 함수
const withVNode = (data) => {
  return h(ElLink, { type: 'primary', href: data.cellValue }, () =>
      h('span', null, data.cellValue)
  )
}
const clickItem = (id)=>{
    addItem.value.openDialog();
    clickItemId.value = id;
    getComponentItemList(id).then(res=>{
      componentItems.value = res.list;
    })
}
//체크아이뎀
const addItems = ()=>{
  checkItems.value.openDialog();
}

//아이템 추가
const checkGoods = ref([]);
const addCheckItems = ()=>{
    checkItems.value.closeDialog();
    createComponentItem(clickItemId.value,checkGoods.value).then(res=>{
       showMsg("추가성공하였습니다");
        getComponentItemList(clickItemId.value).then(res=>{
          componentItems.value = res.list;
        })
    })
}
//아이템 삭제
const deleteComponentItemEvent = (id)=>{
    deleteComponentItem(id).then(res=>{
      showMsg("아이템삭제성공하였습니다");
      getComponentItemList(clickItemId.value).then(res=>{
        componentItems.value = res.list;
      })
    })
}
//아이템관련 상품 자세히 보기
const detailComponentGoodsDialong = ref("");
const detailComponentGoods = ref("");
const detailComponentItemGoods = (id)=>{
    getGoods(id).then(res=>{
      detailComponentGoods.value = res.goods[0];
      detailComponentGoodsDialong.value.openDialog();
    })
}
/*------------------------------------------------- 배너부분 --------------------------------------------------------------------*/
//배너 보기
const bannerId = ref("");
const addBanner = ref("");
const clickBanner = (id)=>{
  addBanner.value.openDialog();
  bannerId.value=id;
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
          <el-button v-if="row.banner" disabled type="info">보기정지</el-button>
          <el-button v-else type="danger" round @click="clickItem(row.id)">아이템보기</el-button>
        </template>
      </el-table-column>
      <el-table-column label="배너아이템" width="230" align="center">
        <template #default="{row}">
          <el-button v-if="row.banner" type="danger" round @click="clickBanner(row.id)">배너보기</el-button>
          <el-button type="info" disabled v-else>보기정지</el-button>
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
      <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
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
          <el-select v-model="formData.component" placeholder="컴포넌트선택" style="width: 240px">
            <el-option
                v-for="item in componentNames"
                :key="item.id"
                :label="item.title"
                :value="item.name"
            />
          </el-select>
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
        <el-form-item label="더보기">
          <el-radio-group v-model="formData.more" size="large">
            <el-radio-button label="숨김" :value="0" />
            <el-radio-button label="정상" :value="1" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="더보기링크">
          <el-input
              v-model="formData.more_link"
              maxlength="300"
              style="width: 450px"
              placeholder="더보기 링크를 입력하세요"
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
        <el-form-item label="배너아이템">
          <el-radio-group v-model="formData.banner" size="large">
            <el-radio-button label="아님" :value="0" />
            <el-radio-button label="맞음" :value="1" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="아이템수">
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
  <Dialong ref="addItem" title="컴포넌트-아이템" @submit="" :confirm="false" width="80%" height="30%" top="25vh">
     <el-button type="primary" @click="addItems" style="margin-top: 10px">아이템추가</el-button>
     <el-table
         :data="componentItems"
         style="margin-top: 50px"
     >
       <el-table-column type="index" width="50" />
       <el-table-column label="타이틀" prop="title" width="350" :tooltip-formatter="withVNode"></el-table-column>
       <el-table-column label="이미지" align="center" width="200">
          <template #default="{row}">
            <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
          </template>
       </el-table-column>
       <el-table-column label="기기타입" align="center" width="150">
         <template #default="{row}">
           <el-button type="primary" plain>
                   <span v-if="row.type === 1">
                      新合约机
                   </span>
             <span v-else-if="row.type === 2">
                     开封合约机
                   </span>
             <span v-else-if="row.type === 3">
                     新专柜机
                   </span>
             <span v-else-if="row.type === 4">
                     开封专柜机
                   </span>
             <span v-else-if="row.type === 5">
                     二手商品
                   </span>
             <span v-else-if="row.type === 6">
                     配件商品
                   </span>
           </el-button>
         </template>
       </el-table-column>
       <el-table-column label="라벨" align="center" width="150">
         <template #default="{row}">
            <p :style="{backgroundColor:row.label_color,width:'100%',height:'35px',lineHeight:'35px',borderRadius:'5px'}">{{row.label}}</p>
         </template>
       </el-table-column>
       <el-table-column label="용량" align="center" width="150" prop="storage">
       </el-table-column>
       <el-table-column label="시장가격" align="center" width="180">
         <template #default="{row}">
           {{priceDollar(row.price)}} 원
         </template>
       </el-table-column>
       <el-table-column label="판매가격" align="center" width="180">
         <template #default="{row}">
           {{priceDollar(row.price1)}} 원
         </template>
       </el-table-column>
       <el-table-column label="중고가격" align="center" width="180">
         <template #default="{row}">
           {{priceDollar(row.price2)}} 원
         </template>
       </el-table-column>
       <el-table-column label="설정" align="center">
         <template #default="{row}">
           <el-button style="margin-right: 20px" type="danger" round @click="detailComponentItemGoods(row.goods_id)">상품보기</el-button>
           <el-popconfirm
               confirm-button-text="确认"
               cancel-button-text="取消"
               icon-color="#626AEF"
               title="确定删除吗？"
               @confirm="deleteComponentItemEvent(row.id)"
           >
             <template #reference>
               <el-button type="danger" plain>삭제</el-button>
             </template>
           </el-popconfirm>
         </template>
       </el-table-column>
     </el-table>
  </Dialong>
  <Dialong ref="checkItems" @submit="" :card="false" top="15vh" :confirm="false" :cancellation="false">
     <CheckGoods v-model="checkGoods" @addCheckItems="addCheckItems"></CheckGoods>
  </Dialong>
  <Dialong ref="addBanner" title="컴포넌트-배너" width="80%" height="30%" top="25vh" :confirm="false" :card="false">
      <ComponentBanner :componentId="bannerId"></ComponentBanner>
  </Dialong>
  <Dialong ref="detailComponentGoodsDialong" :confirm="false" width="55%" :card="false">
      <h2 style="text-align: center;margin-top: 10px; margin-bottom: 50px;">상 품 상 세 정 보</h2>
      <el-card style="width:90%;margin-left: 5%;">
        <div style="padding: 30px">
          <p class="goodsContent"><span class="goodsTitle">라벨 </span>  <el-button type="danger" round style="margin-left: 10px">{{detailComponentGoods.label}}</el-button></p>
          <p class="goodsContent"><span class="goodsTitle">타입 </span>
            <el-button type="primary" plain style="margin-left: 10px">
                   <span v-if="detailComponentGoods.type === 1">
                      新合约机
                   </span>
                    <span v-else-if="detailComponentGoods.type === 2">
                             开封合约机
                           </span>
                    <span v-else-if="detailComponentGoods.type === 3">
                             新专柜机
                           </span>
                    <span v-else-if="detailComponentGoods.type === 4">
                             开封专柜机
                           </span>
                    <span v-else-if="detailComponentGoods.type === 5">
                             二手商品
                           </span>
                    <span v-else-if="detailComponentGoods.type === 6">
                             配件商品
                   </span>
          </el-button></p>
          <p class="goodsContent"><span class="goodsTitle">타이틀 </span> - <span class="goodsText">{{detailComponentGoods.title}}</span></p>
          <p class="goodsContent"><span class="goodsTitle">상세타이틀</span> - <span class="goodsText">{{detailComponentGoods.title1}}</span></p>
          <p class="goodsContent" style="display: flex;justify-content: left; align-items: center"><span class="goodsTitle" style="margin-right: 20px">메인이미지  </span> <el-image style="width: 100px; height: 100px" :src="detailComponentGoods.img" fit="cover" /></p>
          <p class="goodsContent" style="display: flex;justify-content: left; align-items: center"><span class="goodsTitle" style="margin-right: 20px">배너이미지  </span>
              <el-image
                style="width: 100px; height: 100px"
                :src="JSON.parse(detailComponentGoods.banner)[0]"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="JSON.parse(detailComponentGoods.banner)"
                show-progress
                :initial-index="4"
                fit="cover"
              />
          </p>
          <p class="goodsContent"><span class="goodsTitle">휴대폰시장 가격  </span> - <span class="goodsText">{{ priceDollar(detailComponentGoods.price)}}원</span></p>
          <p class="goodsContent"><span class="goodsTitle">판매 가격  </span> - <span class="goodsText">{{ priceDollar(detailComponentGoods.price1)}}원</span></p>
          <p class="goodsContent"><span class="goodsTitle">중고 가격  </span> - <span class="goodsText">{{ priceDollar(detailComponentGoods.price2)}}원</span></p>
          <p class="goodsContent"><span class="goodsTitle">색상  </span> - <span class="goodsText">{{detailComponentGoods.color}}</span></p>
          <p class="goodsContent"><span class="goodsTitle">용량  </span> - <span class="goodsText">{{detailComponentGoods.storage}}</span></p>
          <p class="goodsContent"><span class="goodsTitle">중고상품설명  </span> - <span class="goodsText">{{detailComponentGoods.phone_detail}}</span></p>
          <p class="goodsContent"><span class="goodsTitle">일련번호 </span> - <span class="goodsText">{{detailComponentGoods.serial}}</span></p>
          <p class="goodsContent"><span class="goodsTitle">IMEI  </span> - <span class="goodsText">{{detailComponentGoods.imei}}</span></p>
        </div>
      </el-card>
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