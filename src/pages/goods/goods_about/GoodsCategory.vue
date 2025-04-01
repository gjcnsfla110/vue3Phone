<script setup>

    defineOptions({
        name: 'GoodsCategory',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable, useInitFrom, listTrees,menuListTrees,orderTrees} from "@/composables/useCommon.js";
    import {categoryList,addCategory,updateCategory,updateStatus,deleteCategory} from "@/api/goods/goodsCategory.js";
    import Drawer from "@/components/Drawer.vue";
    import {ref} from "vue";

    //카테고리
    const categoryMenu = ref([]);
    //카테고리 아이이디
    const category_ids = ref([]);
    //카테고리 메뉴사진 url
    const categoryUrl = ref("");
    //카테고리 이름
    const categoryName = ref("");
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
      afterDataList:(res)=>{
          category_ids.value = [{id:0,name:'最上级图片菜单',child:[]}].concat(listTrees(res.list,'category_id','child'));
          categoryMenu.value = menuListTrees(res.menus,res.list,'category_id');
          orderTrees(categoryMenu);
          total.value = res.total;
      },
      getList:categoryList,
      delete:deleteCategory,
      updateStatus:updateStatus,
    })

    const{
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
        category_id:"",
        menu:1,
        name:"",
        img:"",
        ranking:50,
        status:1
      },
      rules:{
        category_id:[
          {
            required: true,
            message:"请选择上级菜单",
            trigger:"change"
          }
        ],
        name:{
          required: true,
          message:"请选择上级菜单",
          trigger:"blur"
        }
      },
      getDataList:getData,
      update:updateCategory,
      create:addCategory,
    })
    getData();
    const childAdd = (id)=>{
        handleCreate();
        formData.category_id = id;
        formData.status = 1;
    }

    const showImg = data=>{
        categoryUrl.value = data.img;
        categoryName.value = data.name;
    }

</script>

<template>
    <el-card>
       <ListHeader @create="handleCreate"></ListHeader>
       <el-tree
        :data="categoryMenu"
        node-key="id"
        :props="{label: 'name', children: 'child'}"
        v-loading="loading"
       >
        <template #default="{node,data}">
          <div class="custom-tree-node" @click.stop>
            <div style="display: flex;align-items: center;">
              <el-tag type="primary" v-if="data.menu === 1">菜单</el-tag>
              <el-tag type="info" v-else>显示菜单</el-tag>
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
              <el-button
                  v-if="data.img"
                  type="primary"
                  plain
                  @click="showImg(data)"
              >
                 查看图片
              </el-button>
            </div>
          </div>
        </template>
       </el-tree>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
         <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            label-width="auto"
         >
            <el-form-item label="选择上级菜单" prop="category_id">
              <el-cascader
                  v-model="formData.category_id"
                  :options="category_ids"
                  :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                  placeholder="请选择上级菜单"
              />
            </el-form-item>
             <el-form-item label="菜单OR内菜单" >
               <el-radio-group v-model="formData.menu" size="large">
                 <el-radio-button label="菜单" :value="1" />
                 <el-radio-button label="内菜单" :value="0" />
               </el-radio-group>
             </el-form-item>
            <el-form-item label="填写名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
           <el-form-item label="图片URL" v-if="formData.menu == 0">
             <el-input v-model="formData.img"></el-input>
           </el-form-item>
            <el-form-item label="选择排序">
              <el-input-number v-model="formData.ranking"/>
            </el-form-item>
            <el-form-item label="状态">
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
    .pagination{
      height: 80px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .custom-tree-node{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-size: 14px;
      padding-right: 15px;
      padding-left: 8px;
    }
</style>