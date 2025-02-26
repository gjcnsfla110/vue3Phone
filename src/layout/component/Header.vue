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
const {asideWidth} = storeToRefs(useMangerStore);
const menuToggle = ()=>{
  asideWidth.value =  asideWidth.value == "250px" ? "64px" : "250px";
}

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
</script>

<template>
   <div class="header">
     <div class="header_left">
          <p class="title_box">
          <span></span>
          <span>小韩手机</span>
          </p>
          <p class="icon_btn_box">
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

            <el-tooltip
                class="box-item"
                effect="dark"
                content="刷新页面"
                placement="bottom"
            >
              <el-icon class="icon_tbn" :size="18"><Refresh /></el-icon>
            </el-tooltip>
          </p>
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
.header{
    width: 100%;
    height: 64px;
    background-color: cornflowerblue;
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