<script setup>
   defineOptions({
     name: 'Login',
   })
   import {ref,reactive} from "vue";
   const loginFromRef = ref(null);
   const loginForm = reactive({
        userId:"",
        userPass: "",
        checkCode : "",
   })
   const rules = {
       userId:[
         {
           required: true, message:"请输入管理员账号",trigger:"blur"
         }
       ],
       userPassword:[
         {
           required: true, message:"请输入密码",trigger:"blur"
         }
       ],
       checkCode:[
         {
           required: true, message:"请输入验证码",trigger:"blur"
         }
       ]
   }
</script>

<template>
   <el-row>
     <el-col :lg="16" :md="12" class="login-left">
       <div class="login-title">
           <h2>欢迎欢迎-小韩手机</h2>
           <p>在韩小韩手机-为您服务</p>
       </div>
     </el-col>
     <el-col :lg="8" :md="12" class="login-right">
       <el-form
           label-width="auto"
           class="loginFrom"
       >
         <el-form-item>
         <div class="login-form-title">
           <p class="login-form-title-top">欢迎回来</p>
           <p class="login-form-title-bottom">登录账号</p>
         </div>
        </el-form-item>
          <el-form-item label="管理员账号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="管理员密码">
            <el-input></el-input>
          </el-form-item>
         <el-form-item label="验证码">
           <el-input></el-input>
         </el-form-item>
         <div class="login-form-bottom">
           <el-button type="primary" size="large">登录</el-button>
           <el-button type="danger" size="large">取消</el-button>
         </div>
       </el-form>
     </el-col>
   </el-row>
</template>
<style scoped lang="scss">
   .login-left{
     background-color: cornflowerblue;
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     .login-title{
       width: 50%;
       height: 500px;
       text-align: center;
       color: white;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       h2{
         font-weight: bold;
         font-size: 36px;
       }
       p{
         font-size: 20px;
       }
     }
   }
   .login-right{
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;

     .loginFrom{
       width: 90%;
       height: 500px;
       padding: 50px;
       display: flex;
       flex-direction: column;
       justify-content: center;
       .login-form-title{
         width: 100%;
         text-align: center;
         .login-form-title-top{
           font-size: 28px;
           font-weight: bold;
           color: rgb(100,100,100);
           margin: 0;
           padding: 5px;
         }
         .login-form-title-bottom{
           font-size: 20px;
           color: rgb(150,150,150);
           margin: 0;
           padding: 10px;
         }
       }
       .login-form-bottom{
         text-align: center;
       }
     }
   }
</style>