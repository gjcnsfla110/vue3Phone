<script setup>
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import managerStore from "@/store/manager.js";
import {onBeforeRouteUpdate, useRouter} from "vue-router";

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 70
const activeMenu = ref('/');
// 监听路由变化
onBeforeRouteUpdate((to,from)=>{
  activeMenu.value = to.path
})
const router = useRouter();
const useMangerStore = managerStore();
const {menus,asideWidth} = storeToRefs(useMangerStore);
const isCollapse = computed(()=> asideWidth.value == "250px" ? false : true);

const changeRoute = (e)=>{
  router.push(e);
}

</script>

<template>
  <div class="menuBox" :style="{width:asideWidth}">
      <el-menu
          :style="{height:h+'px'}"
          collapse-transition
          :collapse="isCollapse"
          unique-opened
          @select="changeRoute"
          :default-active = "activeMenu"
      >
        <template v-for="menu in menus">
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
        </template>
      </el-menu>
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