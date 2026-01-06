<script setup>
   import Drawer from "@/components/Drawer.vue";
   import ListHeader from "@/components/ListHeader.vue";
   import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
   import {getList,subPageCreate,updateStatus,subPageDelete,subPageUpdate} from "@/api/main/subPage.js";
   import CheckImg from "@/components/CheckImg.vue";
   import {ref,watch} from "vue";

   //카테고리 변수
   const subMenuCategoryList = ref([]);
   const subCategoryList = ref([])
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
     getList:getList,
     delete:subPageDelete,
     updateStatus:updateStatus,
     afterDataList(res){
       subMenuCategoryList.value = res.subMenuCategorys;
       total.value = res.total;
       dataList.value = res.list;
     }
   })

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
        img:"",
        category_id:"",
        category_type:"",
        link:"",
        status:1,
        ranking:50
     },
     rules:{
        name:{
          required: true,
          message:"填写副菜单名称",
          trigger:"blur"
        },
        category_type:{
          required: true,
          message:"상품타입을 선택하세요",
        },
        category_id:{
          required: true,
          message:"카테고리를 선택하세요",
        }
     },
     update:subPageUpdate,
     create:subPageCreate,
     getDataList:getData
   });
   getData();
   const resetRadio=(value)=>{
       formData.category_type = value;
       formData.category_id="";
   }

   const changeSubCategory = (category_type)=>{
       return subMenuCategoryList.value.filter(item=>item.type === category_type);
   }

   //카테고리 변경에따라 subCategoryList 부분
   watch(() => formData.category_type,(newValue)=>{
      subCategoryList.value = changeSubCategory(newValue);
   });
   //검색변수
   const categoryType = [
     {
       name:"휴대폰",
       type:"goods"
     },
     {
       name:"중고폰",
       type:"goods_old"
     },
     {
       name:"계약폰",
       type:"agreement"
     },
     {
       name:"인터넷약정",
       type:"agreement_internet"
     },
     {
       name:"유심",
       type:"usim"
     },
     {
       name:"악세사리",
       type:"accessories"
     },
     {
       name:"오프라인매장",
       type:"shop"
     }
   ]
</script>

<template>
   <el-card>
      <ListHeader @create="handleCreate"></ListHeader>
      <el-table
      v-loading="loading"
      :data="dataList"
      >
         <el-table-column label="菜单名称" prop="name" width="200"></el-table-column>
         <el-table-column label="图片" width="230" align="center">
           <template #default="{row}">
               <div>
                 <el-image style="width: 90px; padding: 5px; height: 90px" :src="row.img" fit="cover" />
               </div>
           </template>
         </el-table-column>
         <el-table-column label="状态" width="200" align="center">
           <template #default="{row}">
             <el-switch @change="handleStatusChange(row.status,row)" v-model="row.status" active-text="显示" inactive-text="隐藏" :active-value="1" :inactive-value="0" />
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
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
   </el-card>
   <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
         :model="formData"
         :rules="formRules"
         ref="formRef"
         label-width="auto">
          <el-form-item label="名称" prop="name">
              <el-input v-model="formData.name" placeholder="填写菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="图片">
              <CheckImg v-model="formData.img"></CheckImg>
          </el-form-item>
          <el-form-item label="상품타입" prop="category_type">
            <el-radio-group v-model="formData.category_type" size="large" fill="#6cf" @change="resetRadio">
              <el-radio-button v-for="item in categoryType" :label="item.name" :value="item.type" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="서브상품 카테고리" prop="category_id" v-if="formData.category_type !== 'shop'">
            <el-select v-model="formData.category_id" placeholder="카테고리선택" style="width: 300px" >
              <el-option
                  v-for="item in subCategoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
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
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>