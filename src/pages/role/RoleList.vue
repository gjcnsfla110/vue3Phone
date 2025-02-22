<script setup>
  defineOptions({
      name: 'RoleList',
  })
  import {ref} from "vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import {
    roleList,
    roleCreate,
    updateRole,
    deleteRole,
    updateStatus,
    updateRules
  } from "@/api/role.js";

  const {
    dataList,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleStatusChange,
    handleDelete,
  } = useInitTable({
    getList:roleList,
    delete:deleteRole,
    updateStatus:updateStatus,
    afterDataList:(res)=>{
      res.list.forEach(item => {
          item.statusLoading = false;
      });
      dataList.value = res.list;
      total.value = res.total;
    }
  })

  const {
    formDrawerRef,
    formRef,
    formData,
    formRules,
    formTitle,
    handleCreate,
    handleUpdate,
    handleSubmit
  } = useInitFrom({
    form:{
      name:"",
      desc:"",
      status:1
    },
    rules:{
      name:[
        {
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur'
        }
      ],
      desc:[{
        required: true,
        message: '角色描述不能为空',
        trigger: 'blur'
      }]
    },
    update:updateRole,
    getDataList:getData,
    create:roleCreate
  })
  getData();
  const updateRuleDrawerRef = ref(null);


</script>

<template>

    <el-card>
      <ListHeader @create="handleCreate"  @refresh="getData"/>
      <el-table v-loading="loading" :data="dataList" stripe style="width: 100%">
         <el-table-column prop="name" label="角色名称" />
         <el-table-column prop="desc" label="角色描述" width="700" />
         <el-table-column  label="状态" width="150" align="center">
           <template #default="{row}">
             <el-switch  :modelValue="row.status" :loading="row.statusLoding"  :active-value="1" :inactive-value="0" @change="handleStatusChange($event,row)"/>
           </template>
         </el-table-column>
         <el-table-column  label="操作" width="400" align="center">
           <template #default="{row}">
             <el-button type="primary" text>配置权限</el-button>
             <el-button type="primary" @click="handleUpdate(row)" text>修改</el-button>
             <el-popconfirm
                 confirm-button-text="确认"
                 cancel-button-text="取消"
                 icon-color="#626AEF"
                 :title="'确认删除 '+row.name+' 角色'"
                 @confirm="handleDelete(row.id)"
             >
               <template #reference>
                 <el-button type="primary" text>删除</el-button>
               </template>
             </el-popconfirm>
           </template>
         </el-table-column>
      </el-table>
      <div class="pages">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" v-model:page-size="limit" :total="total" @change="getData" />
      </div>
    </el-card>
    <Drawer :title="formTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form
          label-width="auto"
          :rules="formRules"
          :model="formData"
          ref="formRef"
        >
            <el-form-item label="角色名称" prop="name">
              <el-input
                  v-model="formData.name"
                  placeholder="角色名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="desc">
              <el-input
                  v-model="formData.desc"
                  :rows="5"
                  placeholder="陈述一下角色扮演者 工作内容 以及 范围"
                  type="textarea"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                  v-model="formData.status"
                  inline-prompt
                  active-text="是"
                  inactive-text="否"
                  :active-value="1"
                  :inactive-value="0"
              />
            </el-form-item>
        </el-form>
    </Drawer>

    <Drawer ref="updateRuleDrawerRef">

    </Drawer>
</template>

<style scoped lang="scss">
    .pages{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;
    }
</style>