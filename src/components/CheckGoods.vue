<script setup>
    import {menuListTrees, orderTrees, useInitTable,addSubmenu} from "@/composables/useCommon.js";
    import {getGoodsList} from "@/api/main/componentItem.js";
    import {ref} from "vue";
    const props = defineProps({

    });
    const mainMenu = ref([]);
    const subMenu = ref([]);
    const menuList = ref([]);
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
        }
        searchForm.isCheck= firstList.value+1;
        firstList.value = firstList.value+1;
      },
      getList:getGoodsList,
    })
    getData();
    //메뉴클릭시 메뉴관련상품갖고오는함수/메뉴클릭함수
    const changeGoods = (id)=>{
        searchForm.category_id = id;
        getData();
    }
</script>

<template>
  <el-container>
    <el-header style="align-items: center;justify-items: center;"><h2>상품아이템</h2></el-header>
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
         >

         </el-table>
        <div class="pagination">
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
</style>