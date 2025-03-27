<script setup>
    defineOptions({
       name: "SpectList",
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import{allList,addSpec,updateSpec,updateStatus,deleteSpec} from "@/api/goods/specList.js";
    import {ref} from "vue";
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
      getList:allList,
      delete:deleteSpec,
      updateStatus:updateStatus,
    });

    const{
      editId,
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
        spec_id:0,
        name:"",
        spec_type:0,
        model:"",
        cpu:'',
        camera:'',
        ram:'',
        color:'',
        storage:'',
        display:'',
        battery:'',
        water:'',
        type:'',
        weight:'',
        launchDate:'',
        status:1,
      },
      rules:{
        spec_id:{
          required: true,
          message:"添加父级菜单",
          trigger:"change"
        },
        name:{
          required: true,
          message:'填写菜单名字',
          trigger:"blur"
        },
        spec_type:{
          required: true,
          message:'选择菜单或参数选项',
          trigger:"blur"
        },
        model:{
          required: true,
          message:'选择上你名称',
          trigger:"change"
        },
        cpu:{
          required: true,
          message:'',
          trigger:"change"
        },
        camera:{
          required: true,
          message:'',
          trigger:"change"
        },
        ram:{
          required: true,
          message:'',
          trigger:"change"
        },
        color:{
          required: true,
          message:'',
          trigger:"blur"
        },
        storage:{
          required: true,
          message:'',
          trigger:"change"
        },
        display:{
          required: true,
          message:'',
          trigger:"change"
        },
        battery:{
          required: true,
          message:'',
          trigger:"change"
        },
        water:{
          required: true,
          message:'',
          trigger:"change"
        },
        type:{
          required: true,
          message:'填写5G网络手机',
          trigger:"change"
        },
        weight:{
          required: true,
          message:'',
          trigger:"blur"
        },
        launchData:{
          required: true,
          message:'',
          trigger:"blur"
        },
        status:{
          required: true,
          message:'',
          trigger:"change"
        }
      },
      create:addSpec,
      update:updateSpec,
    });
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate" @reset="getData"></ListHeader>
    <el-tree
        v-loading="loading"
    >

    </el-tree>
  </el-card>
  <div class="bottomPage">
    <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
  </div>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">

  </Drawer>
</template>

<style scoped lang="scss">
  .bottomPage{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>