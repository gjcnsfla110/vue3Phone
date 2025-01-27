<script setup>
  import Header from "@/layout/component/Header.vue";
  import Main from "@/layout/component/Main.vue"
  import SideMenu from "@/layout/component/SideMenu.vue"
</script>

<template>
   <el-container>
     <el-header>
        <Header></Header>
     </el-header>
     <el-container>
       <el-aside>
         <SideMenu></SideMenu>
       </el-aside>
       <el-main>
          <Main></Main>
       </el-main>
     </el-container>
   </el-container>
</template>

<style scoped>

</style>