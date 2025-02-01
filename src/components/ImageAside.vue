<script setup>
  defineOptions({
    name: 'ImageAside',
  })
  import Drawer from "@/components/Drawer.vue";
  import {ref} from "vue";
  const drawer = ref(null);
  const editMenu = ()=>{
    drawer.value.openDrawer();
  }
  const deleteMenu = ()=>{
     alert("삭제성공")
  }
  defineProps({
     height:{
       type: Number,
     }
  })
</script>

<template>
  <el-aside class="menu_box" :style="{height:height+'px'}">
    <el-menu
        unique-opened
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="1"
        text-color="#fff"
        class="menu_top"
        :style="{height:(height-60)+'px'}"
    >
      <el-sub-menu index="1">
        <template #title>
          <div class="menubar_item">
            <p>
              <span>苹果手机</span>
            </p>
            <div class="menubar_item_button">
                <el-button @click.stop="editMenu"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu">
                  <template #reference>
                    <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                  </template>
                </el-popconfirm>
            </div>
          </div>
        </template>
        <el-menu-item index="2">
          <template #title>
            <div class="menubar_item">
              <p>
                <span>苹果手机</span>
              </p>
              <div class="menubar_item_button">
                <el-button @click.stop  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
              </div>
            </div>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <template #title>
            <div class="menubar_item">
              <p>
                <span>苹果手机</span>
              </p>
              <div class="menubar_item_button">
                <el-button @click.stop  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
              </div>
            </div>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2" v-for="a in 5">
        <template #title>
          <div class="menubar_item">
            <p>
              <span>苹果手机</span>
            </p>
            <div class="menubar_item_button">
              <el-button @click.stop  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
              <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
            </div>
          </div>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="menu_bottom">
        <el-pagination background layout="prev, next" :total="1000" />
    </div>
    <Drawer ref="drawer" title="메뉴를 수정">
        djldfajlfjdkl
    </Drawer>
  </el-aside>
</template>

<style scoped lang="scss">
.menu_box{
  position: relative;
  .menu_top{
   position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow-y: auto;
    .menubar_item{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .menubar_item_button{
          display: flex;
          justify-items: center;
          align-items: center;
        .my_button:hover{
          color: blue;
          background-color: white;
        }
      }
    }
  }
  .menu_bottom{
    height: 60px;
    position: absolute;
    background-color:#545c64;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>