<script setup>
    import {useInitTable} from "@/composables/useCommon.js";
    import {getGoodsList} from "@/api/main/componentItem.js";
    import {ref} from "vue";
    const props = defineProps({

    });
    const mainMenu = ref([]);
    const subMenu = ref([]);
    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
    } = useInitTable({
      afterDataList:(res)=>{
        dataList.value = res.list;
        total.value = res.total;
        mainMenu.value = res.mainMenu;
        subMenu.value = res.subMenu;
      },
      getList:getGoodsList,
    })
    getData();
</script>

<template>
  <el-container>
    <el-header style="align-items: center;justify-items: center;"><h2>상품아이템</h2></el-header>
    <el-container style="border:2px solid #eee;padding:5px;">
      <el-aside width="300px" style="padding: 20px">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
         <el-table
           :data="dataList"
           v-loading ="loading"
         >

         </el-table>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
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