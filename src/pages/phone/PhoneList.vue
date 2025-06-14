<script setup>
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import Drawer from "@/components/Drawer.vue";
  import {getPhoneList,createPhone,updatePhone,updateStatus,itemDetail,deletePhone} from "@/api/phone/phoneList.js";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";
  import CheckImg from "@/components/CheckImg.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {ref} from "vue";
  //검색시사용 메인카테고리아이디
  const searchCategoryId = ref("");
  //입력시사용 메인카테고리아이디
  const category_id =ref("");
  const {
    searchForm,
    resetSearchForm,
    dataList,
    loading,
    currentPage,
    total,
    limit,
    multipleTableRef,
    getData,
    handleStatusChange,
    handleDelete,
    handleStatusChangeAll,
  }= useInitTable({
    defaultSearchForm:{
        title:"",
        sideCategory_id:"",
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
      sideCategory_id:"",
      title:"",
      content:"",
      color:"",
      detail:"",
      img:"",
      banner:[],
      price:"",
      sale_price:"",
      status:1,
      ranking:50
    },
    rules:{
      sideCategory_id:{
        required: true,
        message:"选择菜单",
        trigger:"change"
      },
      title:{
        required: true,
        message:"填写合约标题",
        trigger:"blur"
      },
      detail:{
        required: true,
        message:"填写合约内容",
        trigger:"blur"
      },
      color:{
        required: true,
        message:"填写机器颜色",
        trigger:"blur"
      },
      content:{
        required: true,
        message:"填写合约内容",
        trigger:"blur"
      },
      price:{
        required: true,
        message:"填写手机价格",
        trigger:"blur"
      },
      sale_price:{
        required: true,
        message:"填写优惠完后实价格",
        trigger:"blur"
      }
    }
  })

</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <SearchItem label="主菜单">
        <el-cascader
            v-model="searchForm.model"
            :options="models"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="必选主菜单才可选菜单"
            style="width: 330px"
        />
      </SearchItem>
    </Search>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
     :model="formData"
     :rules="formRules"
     ref="formRef"
     label-width="auto">
       <el-form-item label="主菜单">
         <el-cascader
             v-model="category_id"
             :options="[]"
             :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
             placeholder="必须选择主菜单"
         />
       </el-form-item>
       <el-form-item label="菜单" prop="sideCategory_id">
         <el-select
             v-model="formData.sideCategory_id"
             clearable
             placeholder="请选择标签"
             style="width: 300px"
         >
           <el-option
               v-for="item in []"
               :key="item.id"
               :label="item.name"
               :value="item.id"
           />
         </el-select>
       </el-form-item>
       <el-form-item label="标题" prop="title" style="width: 700px">
           <el-input v-model="formData.title" placeholder="填写合约机标题"></el-input>
       </el-form-item>
       <el-form-item label="介绍" prop="detail" style="width: 700px">
           <el-input v-model="formData.detail" maxlength="1000"
                     placeholder="填写合约机内容"
                     rows="8"
                     type="textarea">

           </el-input>
       </el-form-item>
       <el-form-item label="颜色" prop="color" style="width: 700px">
           <el-input v-model="formData.color" placeholder="填写合约机颜色"></el-input>
       </el-form-item>
       <el-form-item label="内容url" prop="content" style="width: 700px">
           <el-input v-model="formData.content" placeholder="填写合约机连接Url"></el-input>
       </el-form-item>
       <el-form-item label="主图">
         <CheckImg v-model="formData.img" ></CheckImg>
       </el-form-item>
       <el-form-item label="轮播详细图">
         <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
       </el-form-item>
       <el-form-item style="width: 700px" label="价格" prop="price">
            <el-input v-model="formData.price" placeholder="填写价格"  :formatter="(value) => `$ ${Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
       </el-form-item>
       <el-form-item label="优惠后价格" prop="sale_price" style="width: 700px">
            <el-input v-model="formData.Sale_price" placeholder="填写优惠完后价格"></el-input>
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