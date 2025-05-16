<script setup>
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    import {useInitTable, useInitFrom, listTrees} from "@/composables/useCommon.js";
    import {usimCategoryList,updateUsimCategory,updateHotStatus,updateCategoryStatus,deleteUsimCategory,createUsimCategory} from "@/api/usim/usimCategory.js";
    import {ref} from "vue";
    import {menuListTrees} from "@/composables/utill.js";
    import {Hide, View} from "@element-plus/icons-vue";

    const categoryList =ref([]);
    const defaultExpandedKeys = ref([]);
    const {
      loading,
      dataList,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
      changeHot,
    } = useInitTable({
         afterDataList:(res)=>{
           categoryList.value = [{id:0,name:'最上级图片菜单',child:[]}].concat(listTrees(res.list,'pid','child'));
           menuListTrees(res.category,res.list,'pid');
           dataList.value = res.category.map(item=>{
             item.child = item.child.sort((a, b) => b.ranking - a.ranking)
             return item;
           });
           total.value = res.total;
           defaultExpandedKeys.value = res.category.map(item=>item.id);
         },
         getList:usimCategoryList,
         delete:deleteUsimCategory,
         updateStatus:updateCategoryStatus,
         updateHot:updateHotStatus,
         changeHot:updateHotStatus
    });
    const {
      formDrawerRef,
      formRef,
      formData,
      formRules,
      formTitle,
      handleCreate,
      handleUpdate,
      resetFormData,
      handleSubmit
    }= useInitFrom({
        form:{
            pid:"",
            name:"",
            ranking:50,
            status:1,
            hot:0,
        },
        rules:{
           pid:{
             required: true,
             message:"请选择上级菜单",
             trigger:"change"
           },
           name:{
             required: true,
             message:"填写名称",
             trigger:"blur"
           }
        },
        update:updateUsimCategory,
        create:createUsimCategory,
        getDataList:getData
    });
    getData();
    const childCreate = (id)=>{
        handleCreate();
        formData.pid = id;
        formData.status = 1;
    }
</script>

<template>
    <el-card>
       <ListHeader @create="handleCreate"></ListHeader>
      <el-tree
          :default-expanded-keys="defaultExpandedKeys"
          node-key="id"
          :data="dataList"
          :props="{label: 'name',children: 'child'}"
          v-loading="loading"
      >
        <template #default="{node,data}" >
          <div class="custom-tree-node" @click.stop>
            <div style="display: flex;align-items: center;">
              <el-tag type="primary" style="margin-right: 13px">菜单</el-tag>
              <el-icon v-if="data.icon" style="margin-right: 10px;">
                <component :is="data.icon"/>
              </el-icon>
              <span>{{ data.name }}</span>
            </div>
            <div>
              <el-switch
                  v-model="data.hot"
                  inline-prompt
                  size="large"
                  style="--el-switch-on-color: #ff4949 ; --el-switch-off-color:#13ce66; margin-right: 30px"
                  active-text="- 热门菜单 -"
                  inactive-text="- 正常菜单 -"
                  :active-value="1" :inactive-value="0"
                  @change="changeHot(data.hot,data)"
              />
              <el-switch
                  v-model="data.status"
                  :active-action-icon="View"
                  :inactive-action-icon="Hide"
                  :active-value="1" :inactive-value="0"
                  @change="handleStatusChange(data.status,data)"
              />
              <el-button
                  type="info"
                  text
                  style="margin-left: 18px"
                  @click="handleUpdate(data)"
              >
                修改
              </el-button>
              <el-button
                  type="primary"
                  text
                  @click="childCreate(data.id)"
              >
                添加
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
            <el-form-item label="上级菜单" prop="pid">
              <el-cascader
                  v-model="formData.pid"
                  :options="categoryList"
                  :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                  placeholder="请选择上级菜单"
              />
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" placeholder="填写名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                    v-model="formData.status"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="热门菜单">
                <el-switch
                    v-model="formData.hot"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
          <el-form-item label="排序">
                <el-input-number v-model="formData.ranking" />
          </el-form-item>
        </el-form>
    </Drawer>
</template>

<style scoped lang="scss">

</style>