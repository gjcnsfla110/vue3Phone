<script setup>
  import {ref,watch} from "vue";
  import CheckGoodsItems from "@/components/subMenu/CheckGoodsItems.vue";
  import CheckUsimItems from "@/components/subMenu/CheckUsimItems.vue";
  import CheckAccessoriesItems from "@/components/subMenu/CheckAccessoriesItems.vue";
  import CheckAgreementItems from "@/components/subMenu/CheckAgreementItems.vue";
  import {getGoodsItem,addSubPageCategoryGoodsItems,deleteGoodsItem} from "@/api/main/subPageCategory.js";
  import Dialong from "@/components/Dialong.vue";
  import {showMessage} from "@/composables/utill.js";
  import {priceDollar} from "@/composables/useCommon.js";
  const props = defineProps({
        item:{
          type: Object,
          default:()=>{
            return {id:"",type:""}
          }
        }
  })

  //아이템 데이터변수
  const itemsList = ref([]);
  const itemId =ref(props.item.id)
  const itemType = ref(props.item.type);
  //서브메뉴카테고리 속한 items 데이터를 갖고오는 방법
  const getClickCategoryItems = ()=>{
    if (itemId.value === null || itemId.value === undefined || itemId.value === "") {
      return true;
    }
    getGoodsItem(itemId.value).then((data)=>{
      itemsList.value = data;
    })
  }
  //아이템추가
  const itemsModel = ref([]);
  //아이템추가 함수
  const submitCheckItems = ()=>{
    addSubPageCategoryGoodsItems(itemId.value,{items:itemsModel.value}).then((data)=>{
      getClickCategoryItems();
      showMessage("상품추가성공하였습니다");
    }).finally(()=>{
      addListRef.value.closeDialog();
    })
  }

  watch(()=>props.item,(newData)=>{
      itemId.value = newData.id;
      itemType.value = newData.type;
      getClickCategoryItems();
  },
      { deep: true, immediate: true}
  )

  //추가할 데이터리스트Ref 즉 상품리스트,유심리스트,계약폰리스트,악세사리리스트
  const addListRef = ref();
  //추가할 데이터리스트 Dialong 부분
  const clickAddListOpen = ()=>{
    addListRef.value.openDialog();
  }
  //아이템 삭제부분
  const deleteSubMenuCategoryItem = (itemId1,itemUid)=>{
      deleteGoodsItem(itemId.value,itemId1,itemUid).then(res=>{
          showMessage(res);
          getClickCategoryItems();
      })
  }
  getClickCategoryItems();

</script>

<template>
    <el-button type="primary" @click="clickAddListOpen" style="margin-top: 10px;">아이템추가</el-button>
    <el-table :data="itemsList" style="margin-top: 50px">
      <el-table-column label="상품명" prop="title" width="330"></el-table-column>
      <el-table-column label="이미지" width="220" align="center" v-if="itemType !=='usim'">
        <template #default="{row}">
          <el-image
              style="width: 80px; height: 100px; z-index: 1000;"
              :src="row.img"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="[row.img]"
              :preview-teleported="true"
              show-progress
              fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="색상" width="200" align="center" v-if="itemType !=='usim'">
        <template #default="{row}">
          <el-text class="mx-1" type="primary">{{row.color}}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="재질" prop="material" width="200" align="center" v-if="itemType ==='accessories'">
      </el-table-column>
      <el-table-column v-if="itemType ==='usim'" width="200" align="center" label="통신사">
         <template #default="{row}">
           {{row.mobile_name}}
         </template>
      </el-table-column>
      <el-table-column v-if="itemType ==='usim'" width="200" align="center" label="인터넷망">
        <template #default="{row}">
          {{row.mobile_type}}
        </template>
      </el-table-column>
      <el-table-column label="가격" width="200" align="center">
         <template #default="{row}">
            {{priceDollar(row.price)}}원
         </template>
      </el-table-column>
      <el-table-column label="상세보기" width="260" align="center">
        <template #default="{row}">
            <el-button type="danger" size="large"> 상 세 보 기 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="설정"  align="center">
        <template #default="{row}">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon-color="#626AEF"
              title="确定删除商品吗？"
              @confirm="deleteSubMenuCategoryItem(row.id,row.uid)"
          >
            <template #reference>
              <el-button type="danger" text bg size="large">删除信息</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="itemType !=='usim'" type="warning" text bg size="large">查看详细图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialong title="" width="70%" height="70%" top="10vh" ref="addListRef" :cancellation="false" :confirm="false" >
        <template v-if="itemType === 'goods'||itemType === 'goods_old'">
            <CheckGoodsItems v-model="itemsModel" @addCheckItems="submitCheckItems"></CheckGoodsItems>
        </template>
        <template v-else-if="itemType === 'agreement'||itemType === 'agreement_internet'">
          <CheckAgreementItems v-model="itemsModel" @addCheckItems="submitCheckItems"></CheckAgreementItems>
        </template>
        <template v-else-if="itemType === 'usim'">
          <CheckUsimItems v-model="itemsModel" @addCheckItems="submitCheckItems"></CheckUsimItems>
        </template>
        <template v-else-if="itemType === 'accessories'">
          <CheckAccessoriesItems v-model="itemsModel" @addCheckItems="submitCheckItems"></CheckAccessoriesItems>
        </template>
    </Dialong>
</template>

<style scoped lang="scss">

</style>