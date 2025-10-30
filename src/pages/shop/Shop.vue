<script setup>

defineOptions({
  name: 'Shop',
})
import {useInitTable, useInitFrom, listTrees} from "@/composables/useCommon.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import{shopList,createShop,updateShop,deleteShop,updateStatus,updateShopImg} from "@/api/shop/shop.js";
import {ref} from "vue";
import CheckImg from "@/components/CheckImg.vue";

const categoryList = ref([]);
const categorys = ref([]);
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
  getList:shopList,
  delete:deleteShop,
  updateStatus:updateStatus,
  afterDataList(res){
    dataList.value = res.list;
    total.value = res.total;
    dataList.value.forEach((item)=>{
      item.shopImg = JSON.parse(item.shopImg);
    })
    categoryList.value = listTrees(res.categorys,'pid','child');
    categorys.value = res.category;
  }
});

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
  create:createShop,
  update:updateShop,
  getDataList:getData,
  form:{
    'category_id':"",
    'name':"",
    'phone':"",
    'phone1':"",
    'wechat':"",
    'wechatImg':"",
    'mainImg':"",
    'shopImg':[],
    'directionsImg':"",
    'shop_introduction':"",
    'hours':"",
    'address':"",
    'status':1
  },
  rules:{
    'category_id':{
      required: true,
      message:"请选择上级菜单",
      trigger:"change"
    },
    'name':{
      required: true,
      message:"请填写门店名字",
      trigger:"blur"
    },
    'shop_introduction':{
      required: true,
      message:"请填写门店介绍",
      trigger:"blur"
    },
    'phone':{
      required: true,
      message:"请填写电话",
      trigger:"blur"
    },
    'hours':{
      required: true,
      message:"请填写门店营业时间",
      trigger:"blur"
    },
    'address':{
      required: true,
      message:"请填写门店地址",
      trigger:"blur"
    },
    'wechat':{
      required: true,
      message:"请填写微信账号",
      trigger:"blur"
    },
  }

});
getData();

//배너수정부분
const shopImg = ref({
  id:"",
  shopImg:[]
})
const shopImgDrawerRef =ref("");
const shopImgFormRef = ref("");
const openShopImgDrawer = (row)=>{
  shopImg.value = {id:row.id,shopImg:row.shopImg};
  shopImgDrawerRef.value.openDrawer();
}
const updateShopImgData = ()=>{
  updateShopImg(shopImg.value.id,shopImg.value.shopImg).then(res=>{
    showMessage("轮播图-修改成功");
    getData();
    shopImgDrawerRef.value.closeDrawer();
  }).finally(()=>{
    shopImgDrawerRef.value.closeDrawer();
  })
}

const dialogVisible = ref(false);
const dialogData = ref({});
const openDialog = item =>{
  dialogData.value = item;
  dialogVisible.value = true
}
const closeDialog = ()=>{
  dialogVisible.value = false
}
</script>
<template>
  <el-card shadow="always" v-loading="loading">
    <ListHeader @create="handleCreate" @refresh="getData" />
    <el-table
        :data="dataList"
        v-loading="loading"
        style="width: 100%; margin-top: 30px"
    >
      <el-table-column label="套餐名称" align="center" width="300" prop="name">
      </el-table-column>

      <el-table-column label="状态" width="150" align="center">
        <template #default="{row}">
          <el-switch
              v-model="row.status"
              :loading="row.statusLoding"
              active-text="正常"
              inactive-text="禁用"
              width="40px"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event,row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="其他" align="center">
        <template #default="{row}">
          <el-button type="primary" plain @click="handleUpdate(row)">修改</el-button>
          <el-button @click="openShopImgDrawer(row)" type="primary" text bg>更改轮播图</el-button>
          <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button
                  type="danger"
                  plain
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="查看详细" align="center">
        <template #default="{row}">
          <el-button type="primary" plain @click="openDialog(row)">查看详细页面</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottomPage">
      <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
    </div>
  </el-card>
  <el-dialog  v-model="dialogVisible" width="50%" :modal="false" :z-index="100">
     <div class="dialogContent">
       <h2 style="text-align: center;margin-top: 30px; margin-bottom: 35px">{{dialogData.name}}</h2>
       <div class="textItem">
         <p class="itemLeft">电话</p><p class="itemRight">{{dialogData.phone}}</p>
       </div>
       <div class="textItem">
         <p class="itemLeft">电话1</p><p class="itemRight">{{dialogData.phone1}}</p>
       </div>
       <div class="textItem">
         <p class="itemLeft">微信账号</p><p class="itemRight">{{dialogData.wechat}}</p>
       </div>
       <div class="textItem">
         <p class="itemLeft">营业时间</p><p class="itemRight">{{dialogData.hours}}</p>
       </div>
       <div class="textItem">
         <p class="itemLeft">地址</p><p class="itemRight">{{dialogData.address}}</p>
       </div>
       <div class="textItem" style="height: 200px">
         <p class="itemLeft" style="height: 200px">门店介绍</p><p class="itemRight" style="height: 200px">{{dialogData.shop_introduction}}</p>
       </div>
       <div>
          <h3 class="imgTitle">门面图片</h3>
          <p class="imgContainer"><el-image :src="dialogData.mainImg"></el-image></p>
       </div>
       <div>
          <h3 class="imgTitle">室内图</h3>
          <p>
            <template v-for="(item,index) in dialogData.shopImg" :key="index">
              <el-image style="width:350px; height:400px; padding: 10px" :src="item" fit="fill"></el-image>
            </template>
          </p>
       </div>
       <div>
         <h3 class="imgTitle">微信二维码</h3>
         <p class="imgContainer"><el-image :src="dialogData.wechatImg"></el-image></p>
       </div>
       <div>
         <h3 class="imgTitle">오시는길사진</h3>
         <p class="imgContainer"><el-image :src="dialogData.directionsImg"></el-image></p>
       </div>
       <div class="footer">
           <el-button type="primary" size="large" @click="closeDialog">关闭窗口</el-button>
       </div>

     </div>
  </el-dialog>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        :model="formData"
        :rules="formRules"
        label-width="auto"
        ref="formRef"
    >
      <el-form-item label="上级菜单" prop="category_id">
        <el-cascader
            v-model="formData.category_id"
            :options="categoryList"
            :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
            placeholder="请选择上级菜单"
        />
      </el-form-item>

      <el-form-item label="门店名称" prop="name">
        <el-input style="width: 600px" v-model="formData.name" placeholder="请填写门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店介绍" prop="shop_introduction">
        <el-input
            v-model="formData.shop_introduction"
            style="width: 600px"
            :rows="8"
            type="textarea"
            placeholder="请填写门店介绍"
            show-word-limit
            maxlength="1000"
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input style="width: 600px" v-model="formData.phone" placeholder="请填写电话"></el-input>
      </el-form-item>
      <el-form-item label="电话1" prop="phone1">
        <el-input style="width: 600px" v-model="formData.phone1" placeholder="请填写电话1"></el-input>
      </el-form-item>
      <el-form-item label="微信账号" prop="wechat">
        <el-input style="width: 600px" v-model="formData.wechat" placeholder="请填写微信账号"></el-input>
      </el-form-item>
      <el-form-item label="营业时间" prop="hours">
        <el-input style="width: 600px" v-model="formData.hours" placeholder="请填写营业时间"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input style="width: 600px" v-model="formData.address" placeholder="请填写地址"></el-input>
      </el-form-item>
      <el-form-item label="门店封面图片">
        <CheckImg v-model="formData.mainImg"></CheckImg>
      </el-form-item>
      <el-form-item label="门店详细图片">
        <CheckImg v-model="formData.shopImg" :limit="20" ></CheckImg>
      </el-form-item>
      <el-form-item label="微信账号图片">
        <CheckImg v-model="formData.wechatImg"></CheckImg>
      </el-form-item>
      <el-form-item label="过来路径图片">
        <CheckImg v-model="formData.directionsImg"></CheckImg>
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
  <Drawer ref="shopImgDrawerRef" title="修改轮播图-图片" @submit="updateShopImgData">
    <el-form
        :model="shopImg"
        ref="shopImgFormRef"
        label-width="auto"
    >
      <el-form-item>
        <CheckImg v-model="shopImg.shopImg" :limit="20"></CheckImg>
      </el-form-item>
    </el-form>
  </Drawer>
</template>
<style scoped lang="scss">
.bottomPage{
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialogContent{
  width: 100%;
  text-align: left;
  padding: 80px;
  .textItem{
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    font-size: 18px;
    .itemLeft{
      width: 20%;
      height: 60px;
      color: rgb(255,153,51);
    }
    .itemRight{
      width: 70%;
      height: 60px;
      color: rgb(120,120,120);
    }
  }
  .imgTitle{
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
  .imgContainer{
     width: 350px;
  }
}
.footer{
  width: 100%;
  height: 100px;
  text-align: center;
  margin-top: 50px;
}
</style>