<script setup>
    defineOptions({
      name: 'ManagerList',
    })
    import {ref} from "vue";
    import Search from "@/components/Search.vue";
    import ListHeader from "@/components/ListHeader.vue";
    import SearchItem from "@/components/SearchItem.vue";
    import {useInitFrom, useInitTable} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import{managerList,updateManager,deleteManager,resetPass,managerCreate,updateStatus} from "@/api/manager.js";
    import {showMsg} from "@/composables/utill.js";
    const roles = ref([]);
    //비밀번호 같은지 체크하는부분
    const isCheckPass = (rule, value, callback) => {
      if(value !== formData.password){
        callback(new Error('填写的确认密码不一致'))
      }else{
        callback()
      }
    }
    //입력하는 아이디 체크부분
    const idFilterInput = (value) => {
      // 영문자 및 숫자만 허용
      formData.manager_id = value.replace(/[^a-zA-Z0-9]/g, "");
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
      formData.password = value.replace(/[^a-zA-Z0-9!@#$%^&*.-_+=()~]/g, "");
    };
    //비밀번호 영문,숫자,/특수기호 대문자 보류중/
    const pass1FilterInput = (value) => {
      //영문,숫자,/특수기호 대문자
      //loginForm.userId = value.replace(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,18}$/,"");
      // 영문자 및 숫자만 허용
      formData.checkPassword = value.replace(/[^a-zA-Z0-9!@#$%^&*.-_+=()~]/g, "");
    };
    //비밀번호 체크
    const passCheck = (rule,value,callback)=>{
      //이부분은 비밀번호는 반드시 영문,숫자,특수기호로만 이루어져야하면 8-20자이내 여야한다
      const regex = /^[a-zA-Z0-9!@#$%^&*.-_+=()~]{7,20}$/;
      if(!regex.test(value)){
        callback(new Error("密码 * 1. 只能用 英文，数字，特殊符号！ * -- * 2. 长度少于20字！ *"))
      }else{
        callback()
      }
    }
    const {
      searchForm,
      resetSearchForm,
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
    } = useInitTable({
      defaultSearchForm:{
         username:""
      },
      afterDataList:(res)=>{
          dataList.value = res.list;
          total.value = res.total;
          roles.value = res.roles;
      },
      getList:managerList,
      updateStatus:updateStatus,
      delete:deleteManager,
    });
    const {
      formDrawerRef,
      formRef,
      formData,
      formRules,
      formTitle,
      handleCreate,
      handleUpdate,
      handleSubmit,
      editId
    } = useInitFrom({
      form:{
        manager_id:"",
        username:"",
        phone:"",
        status:1,
        role_id:"",
        password:"",
        checkPassword:""
      },
      rules:{
        manager_id:[
          {required: true, message: '请输入管理者账号！', trigger: 'blur',},
          {validator:idCheck,trigger: "blur"}
        ],
        username:[
          {required: true, message: '请输入管理者名字！', trigger: 'blur',}
        ],
        phone:[
          {required: true, message: '请输入手机号！', trigger: 'blur',}
        ],
        status:[
          {required: true, message: '请选者状态', trigger: 'change',}
        ],
        role_id:[
          {required: true, message: '请选者所属角色', trigger: 'change',}
        ],
        password:[
          {required: true, message: '请填写密码！', trigger: 'blur',},
          {validator:passCheck,trigger: "blur"}

        ],
        checkPassword:[
          {required: true, message: '请填写确认密码！', trigger: 'blur',},
          {validator:passCheck,trigger: "blur"},
          {validator: isCheckPass, trigger: 'blur',}
        ],
      },
      getDataList:getData,
      create:managerCreate,
      update:updateManager,
    })

    getData();
    //비밀번호 초기화
    const resetPassword = (id)=>{
        resetPass(id).then(res=>{
            showMsg("密码初始化成功！");
        })
    }
</script>

<template>
    <el-card shadow="always">
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
         <template #default>
            <SearchItem label="查询关键词">
               <el-input v-model="searchForm.username" placeholder="查找管理员姓名"></el-input>
            </SearchItem>
         </template>
      </Search>
      <ListHeader @create="handleCreate" @refresh="getData" />
      <el-table v-loading="loading" :data="dataList"  border style="width: 100%">
        <el-table-column prop="username"  label="管理员" width="500">

        </el-table-column>
        <el-table-column  label="所属角色" width="500" align="center">
          <template #default="{row}">
              <div v-if="row.super">
                  <el-text type="danger">超级管理员</el-text>
              </div>
              <div v-else>
                  <el-text>{{row.role.name}}</el-text>
              </div>
          </template>
        </el-table-column>
        <el-table-column prop="California"  label="状态" width="200" align="center">
            <template #default="{row}">
                <el-switch
                  v-model="row.status"
                  inline-prompt
                  :active-value="1"
                  :inactive-value="0"
                  active-text="正常"
                  inactive-text="禁用"
                  @change="handleStatusChange(row.status,row)"
                  :disabled="row.super == 1"
                >
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column  label="操作" align="center">
            <template #default="{row}" >
              <el-text type="danger" v-if="row.super">超级管理员无权修改！</el-text>
              <div v-else>
                <el-button type="primary" text @click="handleUpdate(row)">修改</el-button>
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    icon-color="#626AEF"
                    title="确定删除管理员吗？"
                    @confirm="handleDelete(row.id)"
                >
                  <template #reference>
                    <el-button type="danger" plain round size="small">删除</el-button>
                  </template>
                </el-popconfirm>
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    icon-color="#626AEF"
                    title="管理员初始设置密码？"
                    @confirm="resetPassword(row.id)"
                >
                  <template #reference>
                    <el-button color="#626aef" plain>初始密码</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="auto"
      >
        <el-form-item label="管理者账号" prop="manager_id">
           <el-input v-model="formData.manager_id" placeholder="填写管理者账号" @input="idFilterInput" :disabled="editId ? true : false"></el-input>
        </el-form-item>
        <el-form-item label="管理者姓名" prop="username">
          <el-input v-model="formData.username" placeholder="填写管理者姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="username">
          <el-input v-model="formData.phone" placeholder="填写手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!editId">
          <el-input type="password" v-model="formData.password" placeholder="填写密码" show-password @input="passFilterInput"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" v-if="!editId">
          <el-input type="password" v-model="formData.checkPassword" placeholder="确认密码" show-password @input="pass1FilterInput"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="formData.role_id" placeholder="请选择角色" style="width: 240px">
            <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
              v-model="formData.status"
              width="66"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              active-text="正常"
              inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
    </Drawer>
</template>

<style scoped lang="scss">

</style>