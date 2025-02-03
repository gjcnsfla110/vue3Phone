<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
import Drawer from "@/components/Drawer.vue";
import {ref,reactive} from "vue";
//이미지 클래스 drawer
const drawerImgClass = ref(null);
//이미지 사진 업로드
const drawerPhoto = ref(null);
//이미지클래스 ref
const editImgClassRef = ref(null);
//사진 ref
const editPhotoRef = ref(null);

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

//사진 rules 검증
const photoRules = reactive({
  name : [
    {
      required: true,
      message : "填写图片名字",
      trigger: 'blur'
    }
  ],
  url : [
    {
      required: true,
      message : "填写图片网址",
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

//사진폼 데이터
const editPhotoFormData = reactive({
  name : "",
  url : ""
})

//이미지클래스 submit
const editImgClassSubmit = ()=>{
  editImgClassRef.value.validate(valid => {
    if (valid) return;
  })
}
//사진업로드 submit
const editPhotoSubmit = ()=>{
  editPhotoRef.value.validate(valid => {
    if (valid) return;
  })
}
const value = ref('')
const options = [
  {
    value: 0,
    label: 'Option1',
  },
  {
    value: 1,
    label: 'Option2',
  },
  {
    value: 2,
    label: 'Option3',
  },
  {
    value: 3,
    label: 'Option4',
  },
  {
    value: 4,
    label: 'Option5',
  },
]

const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
//이미지 클래스 drawer 열기
const editClassImgOpen = ()=> drawerImgClass.value.openDrawer();
//이미지 업로드 drawer 열기
const editPhotoOpen = ()=> drawerPhoto.value.openDrawer();
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
         <ImageAside :height="h-65"/>
         <ImageMain :height="h-65"/>
      </el-container>
      <Drawer ref="drawerImgClass" title="图片分类 添加" @submit="editImgClassSubmit()">
        <el-form
            ref="editImgClassRef"
            :model="editImgClassFormData"
            :rules = "imgClassRules"
            label-width="auto"
        >
          <el-form-item label="图片分类" prop="pid">
            <el-select v-model="editImgClassFormData.pid" placeholder="选择分类" style="width: 240px">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="name" label="填写分类">
            <el-input v-model="editImgClassFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="分类优先级" prop="order">
            <el-input-number v-model="editImgClassFormData.order"></el-input-number>
          </el-form-item>
        </el-form>
      </Drawer>

      <Drawer ref="drawerPhoto" title="이미지사진 업로드" @submit="editPhotoSubmit">
        <el-form
          label-width="auto"
          ref="editPhotoRef"
          :model="editPhotoFormData"
          :rules="photoRules"
        >
           <el-form-item label="填写图片名" prop="name">
             <el-input
                 v-model="editPhotoFormData.name"
                 style="width: 600px"
                 placeholder="填写图片名～"
                 clearable
             />
           </el-form-item>
           <el-form-item label="填写图片网址" prop="url">
             <el-input
                 v-model="editPhotoFormData.url"
                 style="width: 600px"
                 placeholder="填写图片网址～"
                 clearable
             />
           </el-form-item>
        </el-form>
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