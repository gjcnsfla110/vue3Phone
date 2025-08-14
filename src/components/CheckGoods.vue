<script setup>
    import {menuListTrees, orderTrees, useInitTable,addSubmenu,priceDollar} from "@/composables/useCommon.js";
    import {getGoodsList} from "@/api/main/componentItem.js";
    import {ref,defineEmits} from "vue";
    import Dialong from "@/components/Dialong.vue";
    const mainMenu = ref([]);
    const subMenu = ref([]);
    const menuList = ref([]);
    const models = ref([]);
    const firstList = ref(1);
    const {
      searchForm,
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
    } = useInitTable({
      defaultSearchForm:{
        category_id:"",
        isCheck:1
      },
      afterDataList:(res)=>{
        dataList.value = res.list;
        total.value = res.total;
        if(firstList.value < 2){
          mainMenu.value = menuListTrees(res.mainMenu,res.menuList,'category_id');
          orderTrees(mainMenu.value);
          subMenu.value = res.subMenu;
          subMenu.value.forEach(item=>{
            item.child = [];
          });
          menuList.value = addSubmenu(mainMenu.value,subMenu.value);
          models.value = res.model;
        }
        searchForm.isCheck= firstList.value+1;
        firstList.value = firstList.value+1;
      },
      getList:getGoodsList,
    })
    getData();

    defineProps({
      modelValue: {
        type: Array,
        required: true,
        default: () => [],
      },
    })
    //메뉴클릭시 메뉴관련상품갖고오는함수/메뉴클릭함수
    const changeGoods = (id)=>{
        searchForm.category_id = id;
        getData();
    }
    //체크한 아이템
    const emit = defineEmits(['addCheckItems','update:modelValue']);
    //선택한 아이템데이터
    const checkItemEvent = (data)=>{
        emit('update:modelValue', data);
    }
    const tableRef = ref("");
    //선택한 아이템을 추가하는 함수
    const submitCheckItem = ()=>{
        emit("addCheckItems");
        tableRef.value.clearSelection();
    }
    //테이블 넘쳐나는부분 ... 만들어주는 함수
    const tableRowFormatter = (data) => {
      return `${data.cellValue}`
    }
    //모델아이디로 모델이름 리턴하는함수
    const findModel =  (id)=>{
        let item = models.value.find(item=>item.id === id);
        return item ? item['name']:"없음";
    }
    //상세내용부분
    const itemData = ref({});
    const itemDetail = ref();
    const url = ref("");
    const srcList = ref([]);
    const detailItem = (data)=>{
        itemDetail.value.openDialog();
        itemData.value = data;
        itemData.value.banner = JSON.parse(itemData.value.banner);
        url.value = itemData.value.banner[0] ? itemData.value.banner[0] : "";
        srcList.value = itemData.value.banner ? itemData.value.banner : [];
    }
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
    <el-container style="border:2px solid #eee;padding:5px;">
      <el-aside width="300px" style="padding: 20px">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            :unique-opened="true"
            text-color="#fff"
            @select="changeGoods"
        >
          <div v-for="menu in menuList">
            <el-sub-menu v-if="menu.child.length > 0" :index="String(menu.id)">
              <template #title>
                  <p>
                    <span>{{menu.name}}</span>
                  </p>
              </template>
              <template v-for="menu1 in menu.child">
                <el-sub-menu v-if="menu1.child.length > 0" :index="String(menu1.id)" >
                  <template #title>
                      <p>
                        <span>{{menu1.name}}</span>
                      </p>
                  </template>
                  <template v-for="menu2 in menu1.child">
                    <el-sub-menu v-if="menu2.child.length > 0" :index="String(menu2.id)">
                      <template slot="title">
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                      </template>
                    </el-sub-menu>
                    <el-menu-item v-else  :index="String(menu2.id)" >
                      <template #title>
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                      </template>
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                <el-menu-item v-else :index="String(menu1.id)">
                  <template #title>
                      <p>
                        <span>{{menu1.name}}</span>
                      </p>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item v-else  :index="String(menu.id)">
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
           v-loading ="loading"
           ref="tableRef"
           @selection-change="checkItemEvent"
           show-overflow-tooltip
           :tooltip-formatter="tableRowFormatter"
         >
           <!-- 체크박스 선택 -->
           <el-table-column type="selection" width="55" />
           <el-table-column label="이미지" align="center" width="150">
             <template #default="{row}">
               <el-tooltip :content="row.title" placement="top">
                  <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
               </el-tooltip>
             </template>
           </el-table-column>
           <el-table-column label="소개" prop="title1" align="center" width="300">
           </el-table-column>
           <el-table-column label="상품" align="center" width="200">
             <template #default="{row}">
               <el-button style="font-size: 16px" round>{{findModel(row.model)}}</el-button>
             </template>
           </el-table-column>
           <el-table-column label="상품타입" width="180" align="center">
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
           <el-table-column label="상품라벨" prop="label" width="200" align="center">
           </el-table-column>
           <el-table-column label="기타" align="center">
             <template #default="{row}">
                 <el-button type="info" @click="detailItem(row)">자세히보기</el-button>
             </template>
           </el-table-column>
         </el-table>
        <div class="pagination" >
          <el-pagination @change="getData" background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
        </div>
      </el-main>
      <Dialong ref="itemDetail"  :confirm="false" :card="false" top="15vh" width="60%">
          <div>
             <h4>{{itemData.title}}</h4>
             <p style="margin-top: 20px"><el-text class="mx-1" type="primary">상품</el-text> : {{itemData.title1}}</p>
             <div style="margin-top: 15px"><p style="margin-top: 8px"><el-text class="mx-1" type="primary">시장가격</el-text> : {{priceDollar(itemData.price)}}원</p><br/> <p style="margin-top: 8px"><el-text class="mx-1" type="primary">판매가격</el-text> : {{priceDollar(itemData.price1)}}원</p> <br/> <p style="margin-top: 8px"><el-text class="mx-1" type="primary">중고가격</el-text> : {{priceDollar(itemData.price2)}}원</p></div>
             <div class="demo-image__preview">
                <el-image
                    style="width: 300px; height: 300px; margin-top: 15px"
                    :src="url"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="srcList"
                    show-progress
                    :initial-index="4"
                    fit="cover"
                />
             </div>
             <p style="margin-top: 20px" v-if="itemDetail.phone_detail">중고상품소개 : {{itemDetail.phone_detail}}</p>
             <p style="margin-top: 20px"><el-button v-if="itemDetail.isShop ===1">매장물품</el-button> <el-button v-if="itemDetail.isShop ===2">위탁판매</el-button></p>
          </div>
      </Dialong>
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