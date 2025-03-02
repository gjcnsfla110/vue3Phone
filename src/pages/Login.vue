<script setup>
defineOptions({
  name: 'Login',
})
import {ref,reactive} from "vue";
import {login} from "@/api/manager.js";
import {showMessage} from "@/composables/utill.js";
import {useRouter} from "vue-router";
import managerStore from "@/store/manager.js";
const router = useRouter();
const loginFromRef = ref(null);
const loginForm = reactive({
  manager_id:"",
  password: "",
})
//아이디 입력은 영문자와 숫자로만 이루어져야한다
const idFilterInput = (value) => {
  // 영문자 및 숫자만 허용
  loginForm.manager_id = value.replace(/[^a-zA-Z0-9]/g, "");
};
//아이디 체크
const idCheck = (rule,value,callback)=>{
  //아이디가 영문,숫자로이루어져야한다 다음것은 패턴
  const regex = /^[A-Za-z](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,17}$/;
  if(!regex.test(value)){
    callback(new Error("账号必须 * 1. 首字英文 * -- * 2. 英文，数字组合！ * -- * 3. 大于8字～少于20字！ *"))
  }else{
    callback()
  }
}
//비밀번호 영문,숫자,/특수기호 대문자 보류중/
const passFilterInput = (value) => {
  //영문,숫자,/특수기호 대문자
  //loginForm.userId = value.replace(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,18}$/,"");
  // 영문자 및 숫자만 허용
  loginForm.password = value.replace(/[^a-zA-Z0-9!@#$%^&*.-_+=()~]/g, "");
};
//비밀번호 체크
const passCheck = (rule,value,callback)=>{
  //이부분은 비밀번호는 반드시 영문,숫자,특수기호로만 이루어져야하면 8-20자이내 여야한다
  const regex = /^[a-zA-Z0-9!@#$%^&*.-_+=()~]{0,20}$/;
  if(!regex.test(value)){
    callback(new Error("密码 * 1. 只能用 英文，数字，特殊符号！ * -- * 2. 长度少于20字！ *"))
  }else{
    callback()
  }
}
const rules = {
  manager_id:[
    {
      required: true, message:"请输入管理员账号",trigger:"blur",
    },
    {
      validator: idCheck,
      trigger:"blur",
    }
  ],
  password:[
    {
      required: true, message:"请输入密码",trigger:"blur"
    },
    {
      validator: passCheck,
      trigger:"blur",
    }
  ],
}
//이부분은 로그인 확인 체크부분
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const useManager = managerStore();
      useManager.adminLogin(loginForm).then(res=>{
        showMessage("欢迎来到小韩手机")
        router.push("/")
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

//폼태그 리셋부분입니다
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
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
          ref="loginFromRef"
          :model="loginForm"
          :rules="rules"
          status-icon
      >
        <el-form-item>
          <div class="login-form-title">
            <p class="login-form-title-top">欢迎回来</p>
            <p class="login-form-title-bottom">登录账号</p>
          </div>
        </el-form-item>
        <el-form-item label="管理员账号" prop="manager_id">
          <el-input v-model="loginForm.manager_id" maxlength="18" @input="idFilterInput">
              <template #prefix>
                <el-icon><UserFilled /></el-icon>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input type="password" v-model="loginForm.password" @input="passFilterInput" maxlength="20" show-password>
            <template #prefix>
              <el-icon><Key/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-form-bottom">
          <el-button type="primary" size="large" @click="submitForm(loginFromRef)">登录</el-button>
          <el-button type="danger" size="large" @click="resetForm(loginFromRef)">取消</el-button>
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
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>