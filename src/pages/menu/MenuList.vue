<script setup>
    import {ref} from "vue";

    defineOptions({
      name: 'MenuList',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";
    import {getMenuList,addMenu,deleteMenu,updateMenu,updateStatus} from "@/api/menu.js";
    import {useInitFrom, useInitTable} from "@/composables/useCommon.js";
    import SelectAicon from "@/components/SelectAicon.vue";

    const menus = ref([]);
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
        formData:{
          rule_id:0,
          menu:0,
          name:"",
          condition:"",
          method:"GET",
          status:1,
          order:50,
          icon:"",
          frontpath:""
        },

        update:updateMenu,
        create:addMenu
    });
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
          menus.value = res.menus;
          dataList.value = res.list;
          total.value = res.total;
      }
    });
    getData();

</script>

<template>
  <el-card shadow="always">
    <ListHeader @create="handleCreate" @delete="handleDelete" />
    <el-tree
        :data="dataList"
        :props="{label: 'name',children: 'child'}"
    >
       <template #default>

       </template>
    </el-tree>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
        :model="formData"
        label-width="auto"
        ref="formRef"
        :rules="formRules"
      >
          <el-form-item label="上级菜单">
            <el-cascader
                v-model="formData.rule_id"
               :options="menus"
               :props="{value:'rule_id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
               placeholder="请选择上级菜单"
            />
          </el-form-item>
          <el-form-item label="菜单/规则">
            <el-radio-group v-model="formData.menu">
              <el-radio value="1" size="large" border>菜单</el-radio>
              <el-radio value="0" size="large" border>规则</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称">
             <el-input v-model="formData.name" placeholder="填写名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
              <SelectAicon v-model="formData.icon"/>
          </el-form-item>
      </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>