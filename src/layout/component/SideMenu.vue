<script setup>
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import managerStore from "@/store/manager.js";
import {useRouter} from "vue-router";
const router = useRouter();
const useMangerStore = managerStore();
const {menus,asideWidth} = storeToRefs(useMangerStore);
const isCollapse = computed(()=> asideWidth.value == "250px" ? false : true);

const changeRoute = (e)=>{
  console.log(router.options.route);
  router.push(e);
}

</script>

<template>
  <div class="menuBox" :style="{width:asideWidth}">
    <template v-for="menu in menus">
      <el-menu
          collapse-transition
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          unique-opened
          @select="changeRoute"
      >
        <el-sub-menu :index="menu.name" v-if="menu.child && menu.child.length > 0">
          <template #title>
            <el-icon><component :is="menu.icon"/></el-icon>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item v-for="(item,index) in menu.child" :key="index" :index="item.frontpath">
            <template #title>
              <el-icon><component :is="item.icon"/></el-icon>
              <span>{{item.name}}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :index="menu.frontpath" v-else>
          <el-icon><component :is="menu.icon" /></el-icon>
          <template #title>{{menu.name}}</template>
        </el-menu-item>
      </el-menu>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.menuBox{
  position: fixed;
  left:0;
  right:0;
  top:64px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.5s;
}
</style>