<script setup>
    import Drawer from "@/components/Drawer.vue";

    defineOptions({
       name: 'GoodsBrand',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import {getBrandList,addBrand,deleteBrand,updateBrand} from "@/api/goods/brand.js";

    const{
      searchForm,
      resetSearchForm,
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      delete:deleteBrand,
      getList:getBrandList,
    })

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
    } = useInitFrom({
      form:{
        name:"",
        introduce:"",
        nation:"",
        logo:""
      },
      rules:{
        name:{
          required: true,
          message:"填写品牌名称",
          trigger:"blur"
        },
        introduce:{
          required:true,
          message:"填写品牌介绍",
          trigger:"blur"
        },
        nation:{
          required:true,
          message:'填写品牌生产地区',
          trigger:"blur"
        }
      },
      create:addBrand,
      update:updateBrand,
      getDataList:getData,
    })
    getData();
</script>

<template>
   <el-card>
     <list-header @create="handleCreate" @reset="getData"></list-header>
     <el-table
        v-loading="loading"
        :data="dataList"
        stripe
     >
       <el-table-column type="expand">
          <template #default="{row}">
              <div style="width: 30%; text-align: left;">
                <p style="width: 100%; text-align: center;"> <el-text tag="b" type="warning" size="large">品牌介绍 </el-text></p>
                <P style="margin-top: 10px; width: 100%;text-align: center"><el-text tag="p" type="info">{{row.introduce}} </el-text></P>
              </div>
          </template>
       </el-table-column>
       <el-table-column align="left"  prop="name" label="品牌名称" width="300" />
       <el-table-column align="center" prop="nation" label="生产地区" width="300" />
       <el-table-column align="center" label="操作" min-width="120">
         <template #default="{row}">
           <el-button type="primary" style="margin-right: 20px" @click="handleUpdate(row)">
             修改
           </el-button>
           <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(row.id)">
             <template #reference>
               <el-button
                   type="danger"
               >
                 删除
               </el-button>
             </template>
           </el-popconfirm>
         </template>
       </el-table-column>
     </el-table>
     <div class="pagination">
       <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
     </div>
   </el-card>
   <Drawer ref="formDrawerRef" @submit="handleSubmit" :title="formTitle">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="formRef"
        label-width="auto"
      >
          <el-form-item label="品牌名称" prop="name">
              <el-input style="width: 70%" v-model="formData.name" placeholder="填写品牌名称"></el-input>
          </el-form-item>
        <el-form-item label="生产地区" prop="nation">
          <el-input style="width: 70%" v-model="formData.nation" placeholder="填写生产地区"></el-input>
        </el-form-item>
        <el-form-item label="品牌介绍" prop="introduce">
          <el-input
              style="width: 70%"
              :rows="5"
              type="textarea"
              placeholder="填写品牌信息"
              v-model="formData.introduce">

          </el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-input style="width: 70%" v-model="formData.logo" placeholder="填写品牌LOGO"></el-input>
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