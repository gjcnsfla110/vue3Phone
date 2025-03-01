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
    import{managerList,updateManager,deleteManager,resetPass,managerCreate} from "@/api/manager.js";

    const roles = ref([]);
    const isCheckPass = (rule, value, callback) => {
          if (value === "") {
            callback(new Error('填写确认密码'))
          }else if(value !== formData.password){
            callback(new Error('填写的确认密码不一致'))
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
      getList:managerList
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
          {required: true, message: '请输入管理者账号！', trigger: 'blur',}
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
          {required: true, message: '请填写密码！', trigger: 'blur',}
        ],
        checkPassword:[
          {validator: isCheckPass, trigger: 'blur',}
        ],
      },
      create:managerCreate,
      update:updateManager,
    })
    getData();
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
      <el-table :data="dataList"  border style="width: 100%">
        <el-table-column prop="username"  label="管理员" width="500">

        </el-table-column>
        <el-table-column  prop="name" label="所属角色" width="500">

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
                  @change=""
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
                    @confirm=""
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
                    @confirm=""
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
           <el-input v-model="formData.manager_id" placeholder="填写管理者账号"></el-input>
        </el-form-item>
        <el-form-item label="管理者姓名" prop="username">
          <el-input v-model="formData.username" placeholder="填写管理者姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="username">
          <el-input v-model="formData.phone" placeholder="填写手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!editId">
          <el-input type="password" v-model="formData.password" placeholder="填写密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" v-if="!editId">
          <el-input type="password" v-model="formData.checkPassword" placeholder="确认密码" show-password></el-input>
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