<script setup>
import {computed, watch, ref} from "vue";
import {storeToRefs} from "pinia";
import managerStore from "@/store/manager.js";
import {onBeforeRouteUpdate, useRouter} from "vue-router";

const props = defineProps({
  menus:{
    type: Array,
    default:()=>[]
  }
})
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 70
const activeMenu = ref(  '');

// 监听路由变化
onBeforeRouteUpdate((to,from)=>{
  activeMenu.value = to.path
})
const router = useRouter();
const useMangerStore = managerStore();
const {asideWidth} = storeToRefs(useMangerStore);
const isCollapse = computed(()=> asideWidth.value == "250px" ? false : true);
//초기에한번 라우터해주시
if(props.menus.length > 0 && props.menus[0].child.length > 0){
  activeMenu.value =  props.menus[0].child[0].frontpath;
  router.push(props.menus[0].child[0].frontpath)
}
//메뉴가 변경될때마다
watch(()=>props.menus,(newMenus)=>{
  if(newMenus.length > 0 && newMenus[0].child.length > 0){
    router.push(newMenus[0].child[0].frontpath)
  }
})

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