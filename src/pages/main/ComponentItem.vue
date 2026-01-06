<script setup>
  import {getComponentItemList,createComponentItem,deleteComponentItem,updateChangeListType,updateRankingData,getGoods,getUsim,getAccessories,getAgreement} from "@/api/main/componentItem.js";
  import {priceDollar} from "@/composables/useCommon.js";
  import { h ,ref,defineProps,watch,computed} from 'vue'
  import { ElLink } from 'element-plus'
  import {showMsg} from "@/composables/utill.js";
  import ComponentItemList from "@/pages/main/ComponentItemList.vue";
  import Dialong from "@/components/Dialong.vue";

  const props = defineProps({
    componentId:{
      type:Number,
      default:0
    },
    componentType:{
      type:String,
      default:""
    },
    itemCount:{
      type:Number,
      default:10,
    }
  })
  //컴포넌트 부분------------------------------
  const propsComponentId = ref("");
  const propsComponentType = ref("");
  const propsItemCount = ref();

  /*----------------------------------------------아이템 부분----------------------------------------------------------------------------*/
  //컴포넌트 아이템
  const componentItems = ref([]);
  //타이틀 ... 표시해주는 함수
  const withVNode = (data) => {
    return h(ElLink, { type: 'primary', href: data.cellValue }, () =>
        h('span', null, data.cellValue)
    )
  }

  //아이템 리스트 갖고오기
  const getList = ()=>{
    if (!propsComponentId.value) return;  // id가 없으면 호출하지 않음 (안전장치)
    getComponentItemList(propsComponentId.value).then((res)=>{
      componentItems.value = res.list;
    });
  }

  /*----------------------------------------------- el-tabel 정리부분 -----------------------------------------------------*/
  // 현재 테이블에 있는 item_type (배열이 비어있지 않으면 첫 번째 행의 item_type 사용)
  const currentItemType = computed(() => {
    if (componentItems.value.length === 0) return 'default'
    return componentItems.value[0].item_type || 'default'
  })

  // item_type별 컬럼 설정 (라벨도 자유롭게 다르게!)
  const columnConfigs = {
    goods: [
      { label: '휴대폰타입', slot:'phoneType', width: '150', align: 'center' },
      { label: '라벨',  slot:'itemLabel', width: '150', align: 'center' },
      { label: '색상', prop: 'color', width: '180', align: 'center' },
      { label: '용량', prop: 'storage', width: '150', align: 'center' },
      { label: '시장가격',slot: 'price', width: '180', align: 'center' },
      { label: '판매가격', slot:'oldNew', width: '180', align: 'center' },
    ],
    accessories: [
      { label: '라벨', slot:'itemLabel', width: '180', align: 'center' },
      { label: '색상', prop: 'color', width: '180', align: 'center' },
      { label: '재질', prop: 'material', width: '180', align: 'center' },
      { label: '판매가격',slot: 'price', width: '180', align: 'center' },
      { label: '세일가격', slot: 'price1', width: '180', align: 'center' },
    ],
    agreement: [
      { label: '색상', prop: 'color', width: '180', align: 'center' },
      { label: '최저기기값', slot: 'price', width: '180', align: 'center' },
      { label: '공시지원금', slot: 'phoneCashSupport', width: '180', align: 'center' },
      { label: '매장지원금', slot: 'shopCashSupport', width: '180', align: 'center' },
    ],
    usim: [  // 4번째 타입 예시
      { label: '데이터', prop: 'usim_data', width: '180', align: 'center' },
      { label: '통화시간', prop: 'usim_tell_time', width: '180', align: 'center' },
      { label: '매월가격', slot: 'price', width: '180', align: 'center' },
    ],
    default: [
      { label: '휴대폰타입', slot:'phoneType', width: '180', align: 'center' },
      { label: '라벨',  slot:'itemLabel', width: '180', align: 'center' },
      { label: '색상', prop: 'color', width: '180', align: 'center' },
      { label: '용량', prop: 'storage', width: '180', align: 'center' },
      { label: '시장가격',  slot: 'price', width: '180', align: 'center' },
      { label: '판매가격',  slot: 'price1', width: '180', align: 'center' },
    ]
  }

  // 현재 타입에 맞는 컬럼 목록
  const tableColumns = computed(() => {
    return columnConfigs[currentItemType.value] || columnConfigs.default
  })

  //아이템 컴포넌트 아이디 및 컴포넌트 타입 감시
  watch(
      () => [props.componentId, props.componentType],
      ([newId, newType]) => {
        // props 값 업데이트
        propsComponentId.value = newId;
        propsComponentType.value = newType;
        // 중요: 목록 다시 불러오기
        if (newId) {  // componentId가 0이 아니면 호출 (초기 0일 때는 필요 없으면 방어 코드)
          getList();
        }
      },
      { immediate: true }  // 컴포넌트 마운트 시에도 바로 실행
  );

  watch(()=>props.itemCount,(count)=>{
      propsItemCount.value = count;
  },{ immediate: true })

  //아이템 추가
  const checkItems = ref(false);//체크아이템즈
  //컴포넌트 아이템리스트 열기
  const openItemList = ()=>{
    checkItems.value = true;
  }
  //컴포넌트 아이템리스트 닫기
  const closeItemList = ()=>{
    checkItems.value = false;
  }
  //추가아이템값
  const itemValues = ref([]);
  //아이템리스트 추가열기
  const addCheckItems = ()=>{
    createComponentItem(propsComponentId.value,itemValues.value,propsComponentType.value).then(res=>{
      showMsg("추가성공하였습니다");
      closeItemList();
      getList();
    })
  }

  //아이템 삭제
  const deleteComponentItemEvent = (id)=>{
    deleteComponentItem(id).then(res=>{
      showMsg("아이템삭제성공하였습니다");
      getList();
    })
  }

  //아이템 list 타입 즉 list1 list2 설정하기
  const changeListType = (type,id)=>{
    updateChangeListType(type,id).then(res=>{
      showMsg("아이템 List 변경하였습니다");
    })
  }

  getList();

  //----------우선순위 변경부분--------
  const rankingDialog = ref(false);
  const rankingId = ref();
  const rankingNumber = ref();
  const openRankingDialog = (id,ranking)=>{
    rankingId.value=id;
    rankingNumber.value=ranking;
    rankingDialog.value = true;
  }
  const closeRankingDialog = ()=>{rankingDialog.value = false;}
  const updateRanking = ()=>{
     updateRankingData(rankingId.value,rankingNumber.value).then(res=>{
        closeRankingDialog();
        showMsg("우선순위 업데이트 성공하였습니다");
        getList();
     })
  }

  //아이텝 자세히보기
  const showItem =(type,id)=>{
    if(type === 'goods'){
      getGoods(id).then((res)=>{
          console.log(res);
      })
    }else if(type === 'accessories'){
      getAccessories(id).then((res)=>{
        console.log(res);
      })
    }else if(type === 'agreement'){
      getAgreement(id).then((res)=>{
        console.log(res);
      })
    }else if(type === 'usim'){
      getUsim(id).then((res)=>{
        console.log(res);
      })
    }
  }
</script>

<template>
  <el-button type="primary" @click="openItemList" style="margin-top: 10px">아이템추가</el-button>
  <el-table
      :data="componentItems"
      style="margin-top: 50px"
  >
    <el-table-column type="index" width="50" />
    <el-table-column label="타이틀" prop="title" width="300" :tooltip-formatter="withVNode"></el-table-column>
    <el-table-column label="이미지" align="center" width="150">
      <template #default="{row}">
        <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column
        v-for="col in tableColumns"
        :key="col.label || col.prop || col.type"
        v-bind="col"
    >
        <template v-if="col.slot === 'phoneType'" #default="{row}">
          <el-button type="primary" plain>
            <span>{{row.type}}</span>
          </el-button>
        </template>
        <template v-if="col.slot ==='itemLabel'" #default="{row}">
          <p :style="{backgroundColor:row.label_color,width:'100%',height:'35px',lineHeight:'35px',borderRadius:'5px',color:'rgb(230,230,230)'}">{{row.label}}</p>
        </template>
        <template v-if="col.slot ==='price'" #default="{row}">
          {{priceDollar(row.price)}} 원
        </template>
        <template v-if="col.slot ==='price1'" #default="{row}">
          {{priceDollar(row.price1)}} 원
        </template>
        <template v-if="col.slot ==='shopCashSupport'" #default="{row}">
          {{priceDollar(row.shopCashSupport)}} 원
        </template>
        <template v-if="col.slot ==='phoneCashSupport'" #default="{row}">
          {{priceDollar(row.phoneCashSupport)}} 원
        </template>
        <template v-if="col.slot ==='oldNew'" #default="{row}">
          <span v-if="row.type ==='二手商品'">{{priceDollar(row.price2)}} 원</span>
          <span v-else>{{priceDollar(row.price1)}} 원</span>
        </template>
    </el-table-column>
    <el-table-column label="우선순위" width="180" align="center">
       <template #default="{row}">
         <el-input-number v-model="row.ranking" size="small" disabled/>
         <el-button style="margin-top: 10px" @click="openRankingDialog(row.id,row.ranking)" type="success">순위수정</el-button>
       </template>
    </el-table-column>
    <el-table-column label="설정" align="center">
      <template #default="{row}">
        <el-button style="margin-right: 20px" type="danger" round @click="showItem(row.item_type,row.item_id)">상품보기</el-button>
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
        <el-switch @change="changeListType(row.listType,row.id)" style="margin-left: 30px; font-size:18px;" v-model="row.listType" :active-value="1" :inactive-value="0" active-text="List2" inactive-text="List1" />
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="checkItems"  width="70%">
    <ComponentItemList v-model="itemValues"  :item_type="propsComponentType" :itemCount="propsItemCount" @submitItem="addCheckItems"></ComponentItemList>
  </el-dialog>
  <Dialong  :confirm="false" width="55%" :card="false">
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

  <el-dialog
      v-model="rankingDialog"
      title="우선순위를 변경하세요"
      width="800"
  >
    <div style="width: 100%;height: 300px; display: flex; justify-content: center; align-items: center;">
      <h3 style="margin-right: 50px;">우선순위 : </h3>
      <el-input-number v-model="rankingNumber" size="large" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeRankingDialog">취소</el-button>
        <el-button type="primary" @click="updateRanking">
            확인
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>