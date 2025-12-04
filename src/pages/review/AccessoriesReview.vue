<script setup>
import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
import {AccessoriesReviewList,createAccessoriesReview,deleteAccessoriesReview} from "@/api/review/accessoriesReview.js";
import ListHeader from "@/components/ListHeader.vue";
import Drawer from "@/components/Drawer.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import {ref,defineProps,watch} from "vue";
import {Plus} from "@element-plus/icons-vue";

const props = defineProps({
  accessoriesId: {
    type: Number,
    default: 0
  }
})

/*---------------------- 사진업로드 부분 ------------------------------*/
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true
}


const {
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
  defaultSearchForm:{
    accessories_id:props.accessoriesId,
    type:"",
    title:""
  },
  getList: AccessoriesReviewList,
  delete:deleteAccessoriesReview,
});
const {
  formDrawerRef,
  formRef,
  formData,
  formRules,
  formTitle,
  handleCreate,
  handleSubmit
}= useInitFrom({
  form:{
    accessories_id:props.accessoriesId,
    type:1,
    title:"",
    img:[],
    video:"",
    date:""
  },
  rules:{
    title:{
      required: true,
      message:"填写标题",
      trigger:"blur"
    },
  },
  beforeSubmit:(form)=>{
    form.accessories_id = accessories_id.value;
    return form;
  },
  getDataList:getData,
  create:createAccessoriesReview,
});
getData();
const accessories_id = ref(props.accessoriesId);
// 1. 단일 props 감시 (가장 많이 씀!)
watch(() => props.accessoriesId, (newId, oldId) => {
  searchForm.accessories_id = newId;
  accessories_id.value = newId;
  getData();
})
//상세화면 보기
const drawerVisible = ref(false);
const reviewData = ref({});
const detailData = (data)=>{
  reviewData.value = data;
  drawerVisible.value = true;
}
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate"></ListHeader>
    <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
      <search-item label="타이틀제목">
        <el-input v-model="searchForm.title" placeholder="리뷰타이틀제목을 검색하세요"></el-input>
      </search-item>
      <search-item label="사진_OR_동영상">
        <el-radio-group v-model="searchForm.type" size="large" fill="#6cf">
          <el-radio-button label="사진" :value="1" />
          <el-radio-button label="동영상" :value="2" />
        </el-radio-group>
      </search-item>
    </Search>
    <el-table
        v-loading="loading"
        :data="dataList">
      <el-table-column label="标题" prop="title" width="500">
      </el-table-column>
      <el-table-column label="日期" prop="date" width="300" align="center">

      </el-table-column>
      <el-table-column label="上传种类" width="300" align="center">
        <template #default="{row}">
          <el-button type="primary" v-if="row.type === 1">图片</el-button>
          <el-button type="primary" v-if="row.type === 2">视频</el-button>
        </template>
      </el-table-column>
      <el-table-column label="详细查看" width="180" align="center">
        <template #default="{row}">
          <el-button type="success" @click="detailData(row)">查看内容</el-button>
        </template>
      </el-table-column>
      <el-table-column label="其他" align="center">
        <template #default="{row}">
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
      <el-pagination @change="getData" background layout="prev, pager, next"  v-model:page-size="limit"  v-model:current-page="currentPage" :total="total" />
    </div>
  </el-card>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
    <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="auto">
      <el-form-item label="评价标题" prop="title" style="width: 700px">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="添加类别">
        <el-radio-group v-model="formData.type" size="large">
          <el-radio-button label="照片" :value="1" />
          <el-radio-button label="视频" :value="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片" v-if="formData.type === 1">
        <el-upload
            v-model:file-list="formData.img"
            list-type="picture-card"
            :auto-upload = "false"
            :on-preview="handlePictureCardPreview"
            :multiple = "true"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="视频链接" v-if="formData.type === 2">
        <el-input v-model="formData.video" placeholder="请填写视频链接" style="width: 80%"></el-input>
      </el-form-item>
    </el-form>
  </Drawer>

  <el-drawer v-model="drawerVisible" :modal="false" modal-penetrable>
    <h3 style="margin-bottom: 30px; text-align: center;width: 100%; height: 50px;">리뷰상세내용</h3>
    <div class="reviewContent">
      <h3 style="color: rgb(255,153,51);letter-spacing: 5px;font-size: 20px;">{{reviewData.title}}</h3>
      <h5 style="margin-top: 20px;font-size: 18px" v-if="reviewData.type == 1">리뷰이미지</h5>
      <div class="reviewImg" v-if="reviewData.type == 1">
        <el-image v-for="item in reviewData.img" :src="item"></el-image>
      </div>
      <div class="reviewVideo" v-if="reviewData.type == 2">
        <h5 style="margin-top: 20px;font-size: 18px;margin-bottom: 20px">리뷰동영상</h5>
        <iframe
            width="100%"
            height="380"
            :src="reviewData.video"
            allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
        </iframe>
      </div>
      <div style="font-size: 16px; margin-top: 10px">
        등록일 : {{reviewData.date}}
      </div>
    </div>
    <template #footer>
      <div>
        <el-button @click="drawerVisible = false">닫기</el-button>
        <el-button type="primary" @click="drawerVisible = false">
          확인
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.reviewContent{
  color: rgb(150,150,150);
  letter-spacing: 3px;
}
.reviewImg{
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.reviewVideo{
  width: 60%;
  margin-top: 10px;
}
</style>