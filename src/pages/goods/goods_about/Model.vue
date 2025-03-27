<script setup>
   defineOptions({
       name: 'Model',
   })
   import ListHeader from "@/components/ListHeader.vue";
   import {ref} from "vue";
   import Drawer from "@/components/Drawer.vue";
   import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
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

   });

   const {
     editId,
     formDrawerRef,
     formRef,
     formData,
     formRules,
     formTitle,
     handleCreate,
     handleUpdate,
     resetFormData,
     handleSubmit
   } = useInitFrom({
      form:{
        pid:"",
        model_type:0,
        menu:"",
        name:"",
        status:1
      },
      rules:{
        pid:{
          required: true, message: '选择上级菜单',trigger:"change"
        }
      }
   })

</script>

<template>
  <el-card>
      <list-header @create="handleCreate" @reset="getData"></list-header>
      <el-tree
          v-loading="loading"
      >
        <template #default="{node,data}">

        </template>
      </el-tree>
  </el-card>
  <div class="bottomPage">
    <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
  </div>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
      :model="formData"
      :rules="formRules"
      label-width="auto"
      ref="formRef"
      >
        <el-form-item label="上级菜单" prop="pid">
          <el-cascader
              v-model="formData.pid"
              :options="[]"
              :props="{value:'menu',label:'menu',children:'child',checkStrictly:true,emitPath:false }"
              placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单OR商品" >
          <el-radio-group v-model="formData.model_type" size="large">
            <el-radio-button label="菜单" :value="1" />
            <el-radio-button label="商品" :value="0" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="填写菜单"  v-if="formData.model_type==1">
            <el-input v-model="formData.menu"></el-input>
        </el-form-item>
        <el-form-item label="填写商品"  v-else>
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="选择状态">
          <el-switch
              v-model="formData.status"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
          />
        </el-form-item>
      </el-form>
  </Drawer>
</template>

<style scoped lang="scss">
  .bottomPage{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>