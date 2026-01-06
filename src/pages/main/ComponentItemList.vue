<script setup>
import {ref,watch,defineEmits} from "vue";
import CheckGoodsItems from "@/components/subMenu/CheckGoodsItems.vue";
import CheckUsimItems from "@/components/subMenu/CheckUsimItems.vue";
import CheckAccessoriesItems from "@/components/subMenu/CheckAccessoriesItems.vue";
import CheckAgreementItems from "@/components/subMenu/CheckAgreementItems.vue";
import CheckComponentCategory from "@/components/subMenu/CheckComponentCategory.vue";
import {showMessage} from "@/composables/utill.js";
const props = defineProps({
  item_type:{
    type: String,
    default:""
  },
  itemCount:{
    type:Number,
    default:10,
  }
})
const emits = defineEmits(["update:modelValue",'submitItem']);
//아이템타입
const itemType = ref("");
watch(()=>props.item_type,(type)=>{
      itemType.value = type;
    },
    {immediate: true}
)
//아이템부분
const itemsModel = ref([]);
//아이템추가한 함수
const submitCheckItems =()=>{
  emits('update:modelValue', itemsModel.value);
  emits('submitItem');
  showMessage('아이템 추가완료 하였습니다');
}

</script>

<template>
  <template v-if="itemType === 'goods'">
    <CheckGoodsItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="props.itemCount"></CheckGoodsItems>
  </template>
  <template v-else-if="itemType === 'accessories'">
    <CheckAccessoriesItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="props.itemCount"></CheckAccessoriesItems>
  </template>
  <template v-else-if="itemType === 'agreement'">
    <CheckAgreementItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="props.itemCount"></CheckAgreementItems>
  </template>
  <template v-else-if="itemType === 'usim'">
    <CheckUsimItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="props.itemCount"></CheckUsimItems>
  </template>
  <template v-else>
    <el-row>
      <el-col :sm="12" :lg="6" :xl="4" style="margin:auto">
        <el-result
            icon="error"
            title="컴포넌트데이터"
            sub-title="관련되는 데이터가 조회되지않습니다"
        >
          <template #extra>
            <el-empty :image-size="200" />
          </template>
        </el-result>
      </el-col>
    </el-row>
  </template>
</template>

<style scoped lang="scss">

</style>