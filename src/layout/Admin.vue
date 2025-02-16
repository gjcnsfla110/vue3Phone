<script setup>
  import Header from "@/layout/component/Header.vue";
  import MenuTabList from "@/layout/component/MenuTabList.vue"
  import SideMenu from "@/layout/component/SideMenu.vue"
  import managerStore from "@/store/manager.js";
  import {storeToRefs} from "pinia";
  const useManagerStore = managerStore()
  const {asideWidth} = storeToRefs(useManagerStore);
</script>

<template>
   <el-container>
     <el-header style="padding: 0">
        <Header></Header>
     </el-header>
     <el-container>
       <el-aside :style="{width:asideWidth}">
         <SideMenu></SideMenu>
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