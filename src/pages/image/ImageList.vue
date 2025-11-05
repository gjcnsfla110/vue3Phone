<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
import Drawer from "@/components/Drawer.vue";
import {ref, reactive, onMounted} from "vue";
import {imageClassAll,addImageClass} from "@/api/imageClass.js";
import {addImage} from "@/api/image.js";
import {showMsg,showMessage} from "@/composables/utill.js";
import { Plus } from '@element-plus/icons-vue'
//사이드라인 이미지메뉴 클릭여부 확인
const isClassA = ref(0);
//imageManin ref
const imageMainRef = ref(null);
//imageAside ref부붑
const imagesClassRef = ref(null);
//이미지 클래스 drawer
const drawerImgClass = ref(null);
//이미지 사진 업로드
const drawerPhoto = ref(null);
//이미지클래스 ref
const editImgClassRef = ref(null);


//이미지클래스 rules 검증
const imgClassRules = reactive({
  pid : [
    {
      required: true,
      message: '选择图片分类',
      trigger: 'change',
    },
  ],
  name : [
    {
      required: true,
      message : "填写分类名字",
      trigger: 'blur'
    }
  ],
  order : [
    {
      required: true,
      message : "用数字填写优选级",
      trigger: 'change'
    }
  ]
});

//이미지클래스 formData
const editImgClassFormData = reactive({
  pid : "",
  name : "",
  order : 50
})
/*---------------------- 사진업로드 부분 ------------------------------*/
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const uploadImgList = ref([]);

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true
}

//이미지 클래스 drawer 열기
const editClassImgOpen = ()=>{
  editImgClassFormData.name="";
  editImgClassFormData.pid ="";
  editImgClassFormData.order =50;
  drawerImgClass.value.openDrawer();
}

//이미지클래스 submit
const editImgClassSubmit = ()=> {
  editImgClassRef.value.validate(valid => {
    if (!valid) return;
    addImageClass(editImgClassFormData).then(res => {
      showMsg("添加成功")
      imagesClassRef.value.getData();
      getClassAll();
      drawerImgClass.value.closeDrawer();
    })
  })
}
//이미지 업로드 drawer 열기
const editPhotoOpen = ()=>{
  if(!isClassA.value){
     showMessage("选择菜单后再添加","error");
     return false;
  }
  uploadImgList.value=[];
  drawerPhoto.value.openDrawer();
};

//사진업로드 submit
const editPhotoSubmit = ()=>{
  if (uploadImgList.value.length === 0) {
    showMsg('파일을 선택해주세요.')
    return
  }
  const formData = new FormData()

  // 1. 파일 추가 (여러 개 가능)
  uploadImgList.value.forEach((file) => {
    formData.append('files[]', file.raw)  // 키: 'files' (배열)
  })
  // 2. 사진클래스 추가
  formData.append('image_class_id', isClassA.value);
  // 3. API 호출
  addImage(formData).then(res=>{
    showMsg("图片添加成功");
    imageMainRef.value.getImagesList(isClassA.value);
  }).finally(res=>{
    drawerPhoto.value.closeDrawer();
  })
}

//클래스리스트를 옵션에 대입
const op = ref([]);
function getClassAll(){
  imageClassAll().then(res=>{
    op.value = res.list;
  })
}
onMounted(()=>{
    getClassAll();
})
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;

//이미지 클릭했을때 이미지들을  갖고오기
function imageClassActive(id){
    isClassA.value = id;
    imageMainRef.value.getImagesList(id);
}
</script>
<template>
    <el-card
        :body-style="{height: h+'px',padding:'0'}"
        shadow="never"
    >
      <el-header class="imageHeader">
        <el-button type="primary" size="small" @click="editClassImgOpen">添加图片分类</el-button>
        <el-button type="danger" size="small" @click="editPhotoOpen">上传图片</el-button>
      </el-header>
      <el-container>
         <ImageAside ref="imagesClassRef" :height="h-65" @classActive="imageClassActive"/>
         <ImageMain ref="imageMainRef" :height="h-65"/>
      </el-container>
      <Drawer ref="drawerImgClass" title="图片分类 添加" @submit="editImgClassSubmit()">
        <el-form
            ref="editImgClassRef"
            :model="editImgClassFormData"
            :rules = "imgClassRules"
            label-width="auto"
        >
          <el-form-item label="图片分类" prop="pid">
            <el-cascader v-model="editImgClassFormData.pid"
                         :options="op"
                         :props="{value:'id',label:'name',children:'child',emitPath:false,checkStrictly:true}"
                         clearable
                         placeholder="选择相册目录"
                         :style="{width: '50%'}"
                        />
          </el-form-item>
          <el-form-item prop="name" label="填写分类">
            <el-input v-model="editImgClassFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="分类优先级" prop="order">
            <el-input-number v-model="editImgClassFormData.order"></el-input-number>
          </el-form-item>
        </el-form>
      </Drawer>

      <Drawer ref="drawerPhoto" title="图片添加 " @submit="editPhotoSubmit">
        <el-upload
            v-model:file-list="uploadImgList"
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
      </Drawer>
    </el-card>
</template>
<style scoped lang="scss">
.imageHeader{
   height: 65px;
   display: flex;
   align-items: center;
   width: 100%;
}
</style>