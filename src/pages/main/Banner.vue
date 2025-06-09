<script setup>
  import Drawer from "@/components/Drawer.vue";
  import ListHeader from "@/components/ListHeader.vue";
  import {getBannerList,createBanner,updateBanner,updateBannerStatus,deleteBanner} from "@/api/main/banner.js";
  import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
  import CheckImg from "@/components/CheckImg.vue";
  import {ref} from "vue";
  import Search from "@/components/Search.vue";
  import SearchItem from "@/components/SearchItem.vue";

  const pageList = ref([]);
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
    afterDataList:(res)=>{
         pageList.value = res.pageList;
         dataList.value = res.bannerList;
         total.value = res.count;
    },
    defaultSearchForm:{
       page_id:""
    },
    getList:getBannerList,
    delete:deleteBanner,
    updateStatus:updateBannerStatus,
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
      page_id:"",
      img:"",
      link:"",
      ranking:50,
      status:1
    },
    rules:{
      page_id:{
        required: true,
        message:'',
        trigger:"change"
      },
      link:{
        required: true,
        message:"",
        trigger:"blur"
      }
    },
    update:updateBanner,
    create:createBanner,
    getDataList:getData
  });
  getData();
  const onPage=(id)=>{
      let value = "";
      pageList.value.forEach((item)=>{
           if(item.id==id){
              value = item.name;
           }
      })
     return value;
  }
</script>

<template>
    <el-card>
        <ListHeader @create="handleCreate"></ListHeader>
        <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
            <SearchItem>
              <el-select
                  v-model="searchForm.page_id"
                  placeholder="选择页面"
                  style="width: 240px"
              >
                <el-option
                    v-for="item in pageList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </SearchItem>
        </Search>
        <el-table
        v-loading="loading"
        :data="dataList"
        style="margin-top:50px;"
        >
          <el-table-column label="菜单名称" width="200">
            <template #default="{row}">
               <div>{{onPage(row.page_id)}}</div>
            </template>
          </el-table-column>
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
            <el-form-item label="页面" prop="page_id">
              <el-select
                  v-model="formData.page_id"
                  placeholder="选择页面"
                  style="width: 240px"
              >
                <el-option
                    v-for="item in pageList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="图片">
                <CheckImg v-model="formData.img"></CheckImg>
            </el-form-item>
            <el-form-item label="连接Url" prop="link">
                <el-input v-model="formData.link"></el-input>
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