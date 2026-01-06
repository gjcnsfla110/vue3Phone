<script setup>
import {useInitTable} from "@/composables/useCommon.js";
import {getSubPageCategoryList} from "@/api/main/subPageCategory.js";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {ref,defineEmits,defineProps} from "vue";
import {showMessage} from "@/composables/utill.js";
const props = defineProps({
  maxSelections:{
    type:Number,
    default:200
  }
})

const emit = defineEmits(['addCheckItems','update:modelValue'])
/**
 * 데이터변수
 */
//검색변수
const categoryType = [
  {
    name: "선택안함",
    type: ""
  },
  {
    name:"휴대폰",
    type:"goods"
  },
  {
    name:"중고폰",
    type:"goods_old"
  },
  {
    name:"계약폰",
    type:"agreement"
  },
  {
    name:"인터넷약정",
    type:"agreement_internet"
  },
  {
    name:"유심",
    type:"usim"
  },
  {
    name:"악세사리",
    type:"accessories"
  },
]

const {
  searchForm,
  resetSearchForm,
  dataList,
  loading,
  currentPage,
  total,
  limit,
  getData,
} = useInitTable({
  defaultSearchForm:{
    type:""
  },
  getList:getSubPageCategoryList,
});

getData();
const tableRef = ref();
//테이블에 체크한 아이템 클릭함수
const checkItemEvent = (data)=>{
  if (data.length > props.maxSelections) {
    // 초과된 선택 취소 (마지막으로 체크된 행만 유지되지 않도록 이전 상태로 복구)
    const excessRow = data[data.length - 1]
    tableRef.value.toggleRowSelection(excessRow, false)

    // 필요시 메시지 표시
    showMessage(`최대 ${props.maxSelections}개까지만 선택 가능합니다.`,'error')
    return;
  }
  emit('update:modelValue', data);
}
//테이블아이템추가
const submitCheckItem = (data)=>{
  emit('addCheckItems');
  tableRef.value.clearSelection();
}
</script>

<template>
  <el-card>
    <div style="margin-top: 20px;margin-bottom: 20px; display: flex; justify-content: right;">
      <el-popconfirm
          confirm-button-text="确认"
          cancel-button-text="取消"
          icon-color="#626AEF"
          title="선택한아이템을 추가하겠습니까？"
          @confirm="submitCheckItem"
      >
        <template #reference>
          <el-button type="primary" size="large" style="margin-right: 10px">선택추가</el-button>
        </template>
      </el-popconfirm>
    </div>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem>
        <el-select v-model="searchForm.type" placeholder="选择商品类型" style="width: 330px">
          <el-option
              v-for="item in categoryType"
              :key="item.type"
              :label="item.name"
              :value="item.type"
          />
        </el-select>
      </SearchItem>
    </Search>
    <el-table
        ref="tableRef"
        v-loading="loading"
        :data="dataList"
        @selection-change="checkItemEvent"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="页面名称" width="350"></el-table-column>
      <el-table-column prop="type" label="填写菜单category_Key" width="350" align="center"></el-table-column>
      <el-table-column label="状态" width="300" align="center">
        <template #default="{row}">
          <el-switch v-model="row.status" active-text="显示" inactive-text="隐藏" :active-value="1" :inactive-value="0" disabled/>
        </template>
      </el-table-column>
      <el-table-column label="查看内容" align="center">
         <template #default="{row}">
            <el-button>查看详细</el-button>
         </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @change="getData" background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>