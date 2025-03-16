<script setup>
    import {ref} from "vue";

    defineOptions({
      name: 'MenuList',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    import {getMenuList,addMenu,deleteMenu,updateMenu,updateStatus} from "@/api/menu.js";
    import {useInitFrom, useInitTable} from "@/composables/useCommon.js";
    import {listTrees} from "@/composables/useCommon.js";
    import SelectAicon from "@/components/SelectAicon.vue";

    const menus = ref([]);
    const defaultExpandedKeys = ref([]);

    /**
     * 数据list,修改状态
     */
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
      getList:getMenuList,
      delete:deleteMenu,
      updateStatus:updateStatus,
      defaultSearchForm:{},
      afterDataList(res){
          menus.value = [{id:0,name:'最上级图片菜单',child:[]}].concat(listTrees(res.menus,'rule_id','child'));
          dataList.value = res.list;
          total.value = res.total;
          defaultExpandedKeys.value = res.list.map(item=>item.id);
      },

    });

    /**
     * 关于添加，修改
     */
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
        rule_id:"",
        menu:0,
        name:"",
        condition:"",
        method:"GET",
        status:1,
        order:50,
        icon:"",
        frontpath:""
      },
      rules:{
        rule_id:{
          required: true,
          message:"请选择上级菜单",
          trigger:"change"
        }
      },
      getDataList:getData,
      update:updateMenu,
      create:addMenu
    });
    getData();
    //자식추가부분
    const childCreate =(id)=>{
        handleCreate();
        formData.rule_id = id;
        formData.status = 1;
    }
</script>

<template>
  <el-card shadow="always" v-loading="loading">
    <ListHeader @create="handleCreate" @refresh="getData" />
    <el-tree
        :default-expanded-keys="defaultExpandedKeys"
        node-key="id"
        :data="dataList"
        :props="{label: 'name',children: 'child'}"
    >
       <template #default="{node,data}" >
           <div class="custom-tree-node" @click.stop>
             <div style="display: flex;align-items: center;">
               <el-tag :type="data.menu ? 'primary':'info'" style="margin-right: 13px">{{data.menu ? '菜单' : "权限"}}</el-tag>
               <el-icon v-if="data.icon" style="margin-right: 10px;">
                  <component :is="data.icon"/>
               </el-icon>
               <span>{{ data.name }}</span>
             </div>
             <div>
               <el-switch
                 v-model="data.status"
                 :active-value="1" :inactive-value="0"
                 style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                 @change=""
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
    <div class="bottomPage">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
        :model="formData"
        label-width="auto"
        ref="formRef"
        :rules="formRules"
      >
          <el-form-item label="上级菜单" prop="rule_id">
            <el-cascader
                v-model="formData.rule_id"
               :options="menus"
               :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
               placeholder="请选择上级菜单"
            />
          </el-form-item>
          <el-form-item label="菜单/规则">
            <el-radio-group v-model="formData.menu">
              <el-radio :value="1" size="large" border>菜单</el-radio>
              <el-radio :value="0" size="large" border>规则</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称">
             <el-input v-model="formData.name" placeholder="填写名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" v-if="formData.menu">
              <SelectAicon v-model="formData.icon"/>
          </el-form-item>
        <el-form-item label="前端路由" v-if="formData.menu && formData.rule_id !== ''">
          <el-input v-model="formData.frontpath" placeholder="填写前端路由"></el-input>
        </el-form-item>
        <el-form-item label="权限规则" v-if="!formData.menu">
          <el-input v-model="formData.condition" placeholder="权限规则"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" v-if="!formData.menu">
          <el-select
              v-model="formData.method"
              style="width: 240px"
          >
            <el-option

                v-for="item in ['GET','POST','PUT','DELETE']"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="优先排序">
          <el-input-number v-model="formData.order" />
        </el-form-item>
      </el-form>
  </Drawer>
</template>

<style lang="scss">
    .bottomPage{
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-tree-node__content {
      height: 45px;
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