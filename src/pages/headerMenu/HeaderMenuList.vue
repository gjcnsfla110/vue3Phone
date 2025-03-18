<script setup>
  defineOptions({
    name: 'HeaderMenuList',
  })
  import ListHeader from "@/components/ListHeader.vue";
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import {onBeforeMount} from "vue";
  import {addTitleMenu,updateTitleMenu,updateStatus,deleteTitleMenu,getTitleMenuList} from "@/api/titleMenu.js";
  import managerStore from "@/store/manager.js";
  import {storeToRefs} from "pinia";
  const managerS = managerStore();
  const  {checkMenu} = storeToRefs(managerS);
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
    updateStatus:updateStatus,
    delete:deleteTitleMenu,
    getList:getTitleMenuList,
    afterDataList:(res)=>{
      res.forEach(item=>{
          item.child = JSON.parse(item.child);
      });
      dataList.value = res;
    }
  });

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
      child:[],
      priority:50,
      status:1
    },
    rules:{
      name:{
        required: true,
        message:"请填写菜单名称！",
        trigger:"blur"
      }
    },
    create:addTitleMenu,
    update:updateTitleMenu,
    getDataList:getData
  });
  onBeforeMount(()=>{
    getData();
  })
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"/>
    <el-table
        v-loading="loading"
        :data="dataList"
        style="width: 100%"
    >
      <el-table-column label="创建时间" width="230">
        <template #default="{row}">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{row.create_time}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="头部菜单" width="300">
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
          <template #default="{row}">
                <el-switch
                    v-model="row.status"
                    :loading="row.statusLoding"
                    active-text="正常"
                    inactive-text="禁用"
                    width="60px"
                    :active-value="1"
                    :inactive-value="0"
                    @change="handleStatusChange($event,row)"
                >
                </el-switch>
          </template>
      </el-table-column>
      <el-table-column label="其他设置" align="center">
        <template #default="{row}">
          <el-button size="small" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon-color="#626AEF"
              :title="'确认删除 '+row.name+' 角色'"
              @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button  size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:30px; display:flex; justify-content: center;align-items: center">
      <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData">
      </el-pagination>
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
         ref="formRef"
         :model="formData"
         :rules="formRules"
         label-width="auto"
     >
         <el-form-item prop="name" label="上菜单名称">
           <el-input v-model="formData.name"></el-input>
         </el-form-item>
         <el-form-item label="选择子菜单">
           <el-checkbox-group v-model="formData.child">
             <el-checkbox v-for="item in checkMenu" :value="item.id" :label="item.name" border ></el-checkbox>
           </el-checkbox-group>
         </el-form-item>
         <el-form-item label="优先级">
           <el-input-number v-model="formData.priority"/>
         </el-form-item>
        <el-form-item label="状态">
          <el-switch
              v-model="formData.status"
              :active-value="1"
              :inactive-value="0"
              inline-prompt
              active-text="正常"
              inactive-text="禁用"
              width="60px"
          >
          </el-switch>
        </el-form-item>
     </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>