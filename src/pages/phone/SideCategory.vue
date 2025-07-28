<script setup>
  import {useInitFrom, useInitTable} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {createSideCategory,updateSideCategory,updateStatus,deleteSideCategory,getSideCategoryList} from "@/api/phone/sideCategory.js";
  import CheckImg from "@/components/CheckImg.vue";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";
  import {ref} from "vue";
  import {listTrees, menuListTrees} from "@/composables/utill.js";
  const menus = ref([]);

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
    defaultSearchForm:{
       category_id:""
    },
    afterDataList:(res)=>{
      menus.value = listTrees(res.menus,'pid','child');
      dataList.value = res.list;
      total.value = res.total;
    },
    getList: getSideCategoryList,
    updateStatus:updateStatus,
    delete:deleteSideCategory,
  });
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
         name:"",
         img:"",
         label:"",
         label_type:'0',
         label_position:1,
         ranking:50,
         status:1,
      },
      rules:{
         name:{
           required: true,
           message:"填写名称",
           trigger:"blur"
         },
         img:{
           required: true,
           message:"填写展示图片链接",
           trigger:"blur"
         },
         category_id:{
           required: true,
           message:"选择主菜单",
           trigger:"change"
         }
      },
      getDataList:getData,
      create:createSideCategory,
      update:updateSideCategory,
  })
  getData();

</script>

<template>
    <el-card>
       <ListHeader @create="handleCreate"></ListHeader>
       <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
           <search-item label="主菜单">
             <el-cascader
                 v-model="searchForm.category_id"
                 :options="menus"
                 :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                 placeholder="请选择上级菜单"
             />
           </search-item>
       </Search>
       <el-table
       v-loading="loading"
       :data="dataList" border style="width: 100%">
         <el-table-column prop="name" label="名称" width="300">
         </el-table-column>
         <el-table-column label="图片" width="280" align="center">
           <template #default="{row}">
             <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
           </template>
         </el-table-column>
         <el-table-column label="标题" align="center" width="300">
           <template #default="{row}">
              <div>
                 <p>{{row.label}}</p>
                 <p style="margin-top: 8px;margin-bottom: 8px"><span>位置 : </span><span v-if="row.label_position ==1">上部</span> <span v-if="row.label_position ==2">中部</span> <span v-if="row.label_position ==3">下部</span></p>
                 <p :style="{backgroundColor:row.label_type,color:'#eee'}">-</p>
              </div>
           </template>
         </el-table-column>
         <el-table-column label="状态" width="150" align="center">
           <template #default="{row}">
             <el-switch
                 v-model="row.status"
                 active-text="正常"
                 inactive-text="禁用"
                 width="40px"
                 :active-value="1"
                 :inactive-value="0"
                 @change="handleStatusChange($event,row)"
             />
           </template>
         </el-table-column>
         <el-table-column label="设置" align="center">
           <template #default="{row}">
             <el-button @click="handleUpdate(row)" type="primary" text bg>修改</el-button>
             <el-popconfirm
                 confirm-button-text="确认"
                 cancel-button-text="取消"
                 icon-color="#626AEF"
                 title="确定删除吗？"
                 @confirm="handleDelete(row.id)"
             >
               <template #reference>
                 <el-button type="danger" text bg>删除</el-button>
               </template>
             </el-popconfirm>
           </template>
         </el-table-column>
       </el-table>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
        <el-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-width="auto"
        >
          <el-form-item label="主菜单" prop="category_id">
            <el-cascader
                v-model="formData.category_id"
                :options="menus"
                :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                placeholder="请选择上级菜单"
            />
          </el-form-item>
         <el-form-item label="名称" prop="name" style="width: 88%">
             <el-input v-model="formData.name" placeholder="请填写副菜单名称"></el-input>
         </el-form-item>
          <el-form-item label="图片链接">
            <CheckImg v-model="formData.img"></CheckImg>
          </el-form-item>
          <el-form-item label="标题_label" >
             <el-input v-model="formData.label" placeholder="请填写标题_label"></el-input>
          </el-form-item>
          <el-form-item label="选择标题模版">
             <el-radio-group v-model="formData.label_type">
               <el-radio-button value="0" label="无"></el-radio-button>
               <el-radio-button value="#206EF3" label="新品"></el-radio-button>
               <el-radio-button value="#C90101" label="热卖"></el-radio-button>
               <el-radio-button value="#FFD603" label="销量高"></el-radio-button>
               <el-radio-button value="#E80000" label="打折"></el-radio-button>
               <el-radio-button value="#FF012C" label="特卖"></el-radio-button>
               <el-radio-button value="#01F3EB" label="性价比"></el-radio-button>
             </el-radio-group>
          </el-form-item>
          <el-form-item label="选择标题模版">
            <el-radio-group v-model="formData.label_position">
              <el-radio-button :value="1" label="上部"></el-radio-button>
              <el-radio-button :value="2" label="中部"></el-radio-button>
              <el-radio-button :value="3" label="下部"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="formData.ranking"></el-input-number>
          </el-form-item>
        </el-form>
    </Drawer>
</template>

<style scoped lang="scss">

</style>