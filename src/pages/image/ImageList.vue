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
    if (!valid) return;
    console.log(editImgClassFormData);
  })
}
//사진업로드 submit
const editPhotoSubmit = ()=>{
  editPhotoRef.value.validate(valid => {
    if (!valid) return;

  })
}
const value = ref('')

const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
//이미지 클래스 drawer 열기
const editClassImgOpen = ()=> drawerImgClass.value.openDrawer();
//이미지 업로드 drawer 열기
const editPhotoOpen = ()=> drawerPhoto.value.openDrawer();









const op = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
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
            <el-cascader v-model="editImgClassFormData.pid"
                         :options="op"
                         :props="{emitPath:false}"
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