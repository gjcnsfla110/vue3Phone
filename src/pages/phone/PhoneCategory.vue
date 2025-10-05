<script setup>
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {createPhoneCategory,phoneChangeHot,updatePhoneCategory,deletePhoneCategory,updatePhoneCategoryStatus,getPhoneCategoryList} from "@/api/phone/phoneCategory.js";
import {listTrees,menuListTrees} from "@/composables/utill.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import {ref} from "vue";
const menus = ref([]);
const defaultExpandedKeys = ref([]);
const {
  dataList,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleStatusChange,
  handleDelete,
  changeHot
} = useInitTable({
  afterDataList:(res)=>{
      menus.value = [{id:0,name:'最上级图片菜单',child:[]}].concat(listTrees(res.menus,'pid','child'));
      menuListTrees(res.list,res.menus,'pid');
      dataList.value = res.list.map(item=>{
        item.child = item.child.sort((a, b) => b.ranking - a.ranking)
        return item;
      });
      total.value = res.total;
      defaultExpandedKeys.value = res.list.map(item=>item.id);
  },
  getList: getPhoneCategoryList,
  updateStatus:updatePhoneCategoryStatus,
  delete:deletePhoneCategory,
  updateHot:phoneChangeHot
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
}= useInitFrom({
  form:{
      pid:"",
      name:"",
      ranking:50,
      status:1,
      hot:0
  },
  rules:{
      pid:{
        required: true,
        message:"选择上级菜单",
        trigger:"change"
      },
      name:{
        required: true,
        message:"填写名称",
        trigger:"blur"
      }
  },
  getDataList:getData,
  create:createPhoneCategory,
  update:updatePhoneCategory,
});
getData();
//자식추가부분
const childCreate =(id)=>{
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
            <span>{{ data.name }}</span>
          </div>
          <div>
            <el-switch
                v-model="data.hot"
                active-text="正常"
                inactive-text="热门"
                width="40px"
                :active-value="0"
                :inactive-value="1"
                @change="changeHot($event,data)"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
            <el-switch
                v-model="data.status"
                active-text="显示"
                inactive-text="隐藏"
                width="40px"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event,data)"
                style="margin-left: 50px"
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
      <el-pagination @change="getData" background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="auto">
      <el-form-item label="上级菜单" prop="pid">
        <el-cascader
            v-model="formData.pid"
            :options="menus"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择上级菜单"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="热门状态">
        <el-radio-group v-model="formData.hot" size="large">
          <el-radio-button label="正常" :value="0" />
          <el-radio-button label="热门" :value="1" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status" size="large">
          <el-radio-button label="显示" :value="1" />
          <el-radio-button label="隐藏" :value="0" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="formData.ranking"/>
      </el-form-item>
    </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>