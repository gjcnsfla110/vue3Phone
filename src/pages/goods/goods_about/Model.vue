<script setup>
   defineOptions({
       name: 'Model',
   })
   import ListHeader from "@/components/ListHeader.vue";
   import {ref} from "vue";
   import Drawer from "@/components/Drawer.vue";
   import {useInitTable, useInitFrom, listTrees, menuListTrees,orderTrees} from "@/composables/useCommon.js";
   import {modelList,addModel,updateModel,deleteModel,updateModelStatus} from "@/api/goods/modelList.js";

   const modelMenu = ref([]);
   const model_ids = ref([]);
   const {
     loading,
     currentPage,
     total,
     limit,
     getData,
     handleStatusChange,
     handleDelete,
   } = useInitTable({
     afterDataList:(res)=>{
       model_ids.value = [{id:0,menu:'最上级模型菜单',child:[]}].concat(listTrees(res.list));
       modelMenu.value = menuListTrees(res.models,res.list,);
       orderTrees(modelMenu);
       total.value = res.total;
     },
     getList:modelList,
     delete:deleteModel,
     updateStatus:updateModelStatus,
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
        pid:"",
        model_type:0,
        menu:"",
        name:"",
        ranking:50,
        status:1
      },
      rules:{
        pid:{
          required: true, message: '选择上级菜单',trigger:"change"
        }
      },
     getDataList:getData,
     update:updateModel,
     create:addModel,
   })
   getData();
   const childAdd = (id)=>{
      handleCreate();
      formData.pid = id;
      formData.status = 1;
   }
</script>

<template>
  <el-card>
      <list-header @create="handleCreate" @reset="getData"></list-header>
      <el-tree
          v-loading="loading"
          :data = "modelMenu"
          node-key="id"
          :props="{label: 'name', children: 'child'}"
      >
        <template #default="{node,data}">
          <div class="custom-tree-node" @click.stop>
            <div style="display: flex;align-items: center;" v-if="data.model_type == 1">
              <el-tag type="primary" >菜单</el-tag>
              <span style="margin-left: 20px">{{data.menu}}</span>
            </div>
            <div style="display: flex;align-items: center;" v-else>
              <el-tag type="info">型号</el-tag>
              <span style="margin-left: 20px">{{data.name}}</span>
            </div>
            <div>
              <el-switch
                  v-model="data.status"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-right: 20px "
                  :active-value="1"
                  :inactive-value="0"
                  @change="handleStatusChange(data.status,data)"
              />
              <el-button
                  type="info"
                  text
                  @click="childAdd(data.id)"
              >
                添加
              </el-button>
              <el-button
                  type="primary"
                  text
                  @click="handleUpdate(data)"
              >
                修改
              </el-button>
              <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(data.id)">
                <template #reference>
                  <el-button
                      type="danger"
                      text
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
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
              :options="model_ids"
              :props="{value:'id',label:'menu',children:'child',checkStrictly:true,emitPath:false }"
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
        <el-form-item label="排序">
            <el-input-number v-model="formData.ranking"/>
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