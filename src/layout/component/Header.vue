<script setup>
import {logout,updateManager} from "@/api/manager.js";
import {showMessagebox,showMsg} from "@/composables/utill.js";
import {showFullLoading,hideFullLoading} from "@/composables/utill.js";
import {useRouter} from "vue-router";
import {removeToken} from "@/composables/auth.js";
import managerStore from "@/store/manager.js";
import {storeToRefs} from "pinia";

const router = useRouter();
const useMangerStore = managerStore();
const {asideWidth,topMenu,activeTopMenu} = storeToRefs(useMangerStore);
const menuToggle = ()=>{
  asideWidth.value =  asideWidth.value == "250px" ? "64px" : "250px";
}

/**
 * 내관리페이지내용
 * @param e
 */
function  myClick(e){
   if(e === "updatPass"){
      alert("update")
   }else if(e === "logout"){
     showFullLoading();
     showMessagebox("确认退出会员吗？","退出会员信息").then(res=>{
       logout().then(res=>{
             removeToken();
             showMsg("退出成功");
             router.push("/login");
           }
       ).catch(error=>{
            showMsg("退出登录失败！联系客服");
       }).finally(()=>{
         hideFullLoading()
       })
     })
   }
}
const emit = defineEmits(['clickMenu'])
const handleSelect =(index)=>{
   //클릭시 마다 pinia통하여 내장브라우서 스토리지에 클릭된 값을 저장
   activeTopMenu.value = index;
   emit('clickMenu');
}
</script>

<template>
   <div class="header">
     <div class="header_left">
          <div class="title_box">
          <span></span>
          <span>小韩手机</span>
            <span class="icon_btn_box">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="菜单"
                placement="bottom"
            >
              <el-icon class="icon_btn" :size="18" @click="menuToggle">
                <fold v-if="asideWidth != '250px'"/>
                <Expand v-else/>
              </el-icon>
            </el-tooltip>
          </span>
          </div>
     </div>
     <div class="header_center">
       <el-menu
           :default-active="activeTopMenu"
           class="el-menu-demo"
           mode="horizontal"
           background-color="rgb(50,50,50)"
           text-color="#fff"
           active-text-color="#ffd04b"
           style="border: none"
           @select="handleSelect"
       >
         <el-menu-item v-for="item in topMenu" :index="item.id.toString()">{{item.name}}</el-menu-item>
       </el-menu>
     </div>
     <div class="header_right">
       <div class="Avatar">
           <el-avatar
               src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
           />
       </div>
       <div class="my">
         <el-dropdown @command="myClick">
            <span>
              许春林<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
           <template #dropdown>
             <el-dropdown-menu>
               <el-dropdown-item command="updatPass">修改密码</el-dropdown-item>
               <el-dropdown-item command="logout">退出登录</el-dropdown-item>
             </el-dropdown-menu>
           </template>
         </el-dropdown>
       </div>
     </div>
   </div>
</template>

<style lang="scss" scoped>
/* 활성화된 메뉴 스타일 */
:deep(.el-menu-item.is-active) {
  background-color: rgb(50,50,50) !important; /* 활성화된 메뉴 배경 */
}
:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: rgb(50,50,50) !important; /* 마우스 오버 배경 */
  color: #ffd04b !important;
  border-bottom: 2px solid #ffd04b !important;
}
.header{
    width: 100%;
    height: 64px;
    background-color: rgb(50,50,50);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  .header_left{
    height: 64px;
    width: 12%;
    line-height: 64px;
    padding-left: 50px;
    font-size: 22px;
    color: white;
    font-weight: bold;
    letter-spacing:8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .icon_btn_box{
      .icon_btn{
        width: 50px;
        height: 64px;
      }
    }

  }
  .header_center{
    height: 64px;
    width: 77%;
    .tabsMenu{
      height: 64px;
      line-height: 64px;
    }
  }
  .header_right{
    height: 64px;
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .Avatar{
    }
    .my{
      margin-left: 15px;
      span{
        color: white;
        border:none;
      }
    }
  }
}
</style>