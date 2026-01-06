<script setup>
import {checkAccessoriesList} from "@/api/accessories/accessories.js";
import {ref,defineEmits,defineProps} from "vue";
import {addSubmenu, menuListTrees, orderTrees} from "@/composables/useCommon.js";
import {priceDollar} from "@/composables/useCommon.js";
import {showMessage} from "@/composables/utill.js";

const props = defineProps({
  maxSelections:{
      type:Number,
      default:200
  }
})

//필요한변수
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const dataList = ref([])
const tableRef = ref();
const categoryMenu = ref([]); // 카테고리 메뉴
const subMenu = ref([]); //카테고리 속한 서브메뉴
const menulist = ref([]);//중간카테고리역할
const searchCategoryId = ref();
const emit = defineEmits(['addCheckItems','update:modelValue'])

//아이디추출정규식
function findCategoryId(text) {
  const regex = /_888_(.*)$/;
  const matchResult = text.match(regex);

  if (matchResult && matchResult.length > 1) {
    // 캡처 그룹(1번 인덱스)에 저장된 "888" 뒤의 문자열을 반환합니다.
    return matchResult[1];
  }
  return "";
}

//테이블 넘쳐나는부분 ... 만들어주는 함수
const tableRowFormatter = (data) => {
  return `${data.cellValue}`
}

//메뉴클릭시 메뉴관련상품갖고오는함수/메뉴클릭함수
const changeGoods = (index)=>{
  searchCategoryId.value = findCategoryId(index);
  getData();
}

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

//상품 리스트갖고오는 함수
const getData = ()=>{
  checkAccessoriesList(currentPage.value,limit.value,{sideCategory_id:searchCategoryId.value}).then((res)=>{
    dataList.value=res.list;
    total.value = res.total;
    menulist.value = menuListTrees(res.mainCategory.filter((item)=>item.pid ===0),res.mainCategory);
    orderTrees(menulist.value);
    subMenu.value = res.sideCategory;
    subMenu.value.forEach(item=>{
      item.child = [];
    });
    categoryMenu.value = addSubmenu(menulist.value,subMenu.value);

  })
}
getData();
</script>

<template>
  <el-container>
    <el-header style="align-items: center;justify-items: center;"><h2>상품아이템</h2></el-header>
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
    <el-container>
      <el-aside>
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            :unique-opened="true"
            text-color="#fff"
            @select="changeGoods"
        >
          <el-menu-item index="">
            전체보기
          </el-menu-item>
          <div v-for="menu in categoryMenu">
            <el-sub-menu v-if="menu.child.length > 0" :index="menu.name+'_888_'+menu.id">
              <template #title>
                <p>
                  <span>{{menu.name}}</span>
                </p>
              </template>
              <template v-for="menu1 in menu.child">
                <el-sub-menu v-if="menu1.child.length > 0" :index="menu1.name+'_888_'+menu1.id" >
                  <template #title>
                    <p>
                      <span>{{menu1.name}}</span>
                    </p>
                  </template>
                  <template v-for="menu2 in menu1.child">
                    <el-sub-menu v-if="menu2.child.length > 0" :index="menu2.name+'_888_'+menu2.id">
                      <template slot="title">
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                      </template>
                    </el-sub-menu>
                    <el-menu-item v-else  :index="menu2.name+'_888_'+menu2.id" >
                      <template #title>
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                      </template>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                <el-menu-item v-else :index="menu1.name+'_888_'+menu1.id">
                  <template #title>
                    <p>
                      <span>{{menu1.name}}</span>
                    </p>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item v-else  :index="menu.name+'_888_'+menu.id">
              <template #title>
                <p>
                  <span>{{menu.name}}</span>
                </p>
              </template>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table
            :data="dataList"
            ref="tableRef"
            :tooltip-formatter="tableRowFormatter"
            @selection-change="checkItemEvent"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="이미지" width="150">
            <template #default="{row}">
              <el-image
                  style="width: 90px; height: 100px; z-index: 1000;"
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
          <el-table-column label="타이틀" width="350" prop="title" align="center"></el-table-column>
          <el-table-column label="가격" width="200" align="center">
            <template #default="{row}">
              {{priceDollar(row.price)}}원
            </template>
          </el-table-column>
          <el-table-column label="색상" prop="color" align="center" width="180">
          </el-table-column>
          <el-table-column label="재질" prop="material" align="center" width="180">
          </el-table-column>
          <el-table-column label="상품설명" align="center">
            <template #default="{row}">
              <el-button size="large" type="danger">자세히보기</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination" >
          <el-pagination @change="getData" background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>