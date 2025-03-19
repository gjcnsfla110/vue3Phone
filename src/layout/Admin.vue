<script setup>
  import Header from "@/layout/component/Header.vue";
  import MenuTabList from "@/layout/component/MenuTabList.vue"
  import SideMenu from "@/layout/component/SideMenu.vue"
  import managerStore from "@/store/manager.js";
  import {storeToRefs} from "pinia";
  import {ref} from "vue";
  const useManagerStore = managerStore()
  const {asideWidth,sideMenu,childMenu,activeTopMenu} = storeToRefs(useManagerStore);
  childMenu.value = sideMenu.value[activeTopMenu.value];
  const clickHeaderMenu = ()=>{
      childMenu.value = sideMenu.value[activeTopMenu.value];
  }

</script>

<template>
   <el-container>
     <el-header style="padding: 0">
        <Header @clickMenu="clickHeaderMenu"></Header>
     </el-header>
     <el-container>
       <el-aside :style="{width:asideWidth}">
         <SideMenu :menus="childMenu"></SideMenu>
       </el-aside>
       <el-main>
          <MenuTabList/>
          <router-view>
          </router-view>
       </el-main>
     </el-container>
   </el-container>
</template>

<style scoped>

</style>