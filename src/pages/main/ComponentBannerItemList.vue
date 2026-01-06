<script setup>
import {ref,watch,defineEmits} from "vue";
import CheckGoodsItems from "@/components/subMenu/CheckGoodsItems.vue";
import CheckUsimItems from "@/components/subMenu/CheckUsimItems.vue";
import CheckAccessoriesItems from "@/components/subMenu/CheckAccessoriesItems.vue";
import CheckAgreementItems from "@/components/subMenu/CheckAgreementItems.vue";
import CheckComponentCategory from "@/components/subMenu/CheckComponentCategory.vue";
import CheckShopNewsItems from "@/components/subMenu/CheckShopNewsItems.vue";
import {showMessage} from "@/composables/utill.js";
const props = defineProps({
  banner_type:{
    type: String,
    default:""
  }
})
const emits = defineEmits(["update:modelValue",'closeBanner']);
//배너타입
const bannerType = ref('');
watch(()=>props.banner_type,(newData)=>{
      bannerType.value = newData;
    },
    { deep: true, immediate: true}
)
//아이템부분
const itemsModel = ref([]);
//아이템추가한 함수
const submitCheckItems =()=>{
    emits('update:modelValue', itemsModel.value[0].id ? itemsModel.value[0].id : "");
    emits('closeBanner');
    showMessage('아이템 추가완료 하였습니다');
}

</script>

<template>
    <template v-if="bannerType === 'goods'">
      <CheckGoodsItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckGoodsItems>
    </template>
    <template v-else-if="bannerType === 'agreement'">
      <CheckAgreementItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckAgreementItems>
    </template>
    <template v-else-if="bannerType === 'usim'">
      <CheckUsimItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckUsimItems>
    </template>
    <template v-else-if="bannerType === 'accessories'">
      <CheckAccessoriesItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckAccessoriesItems>
    </template>
    <template v-else-if="bannerType === 'category'">
      <CheckComponentCategory v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckComponentCategory>
    </template>
    <template v-else-if="bannerType === 'shopNews'">
      <CheckShopNewsItems v-model="itemsModel" @addCheckItems="submitCheckItems" :maxSelections="1"></CheckShopNewsItems>
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