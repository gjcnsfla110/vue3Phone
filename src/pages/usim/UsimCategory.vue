<script setup>
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    import {useInitTable, useInitFrom, listTrees} from "@/composables/useCommon.js";
    import {usimCategoryList,updateUsimCategory,updateHotStatus,updateCategoryStatus,deleteUsimCategory,createUsimCategory} from "@/api/usim/usimCategory.js";
    import {ref} from "vue";

    const categoryList =ref([]);
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
           categoryList.value = [{id:0,name:'最上级图片菜单',child:[]}].concat(listTrees(res.category,'pid','child'));
         },
         getList:usimCategoryList,
         delete:deleteUsimCategory,
         updateStatus:updateCategoryStatus,
         updateHot:updateHotStatus,
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
    });
</script>

<template>
    <el-card>
       <ListHeader @create="handleCreate"></ListHeader>
       <el-table>

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