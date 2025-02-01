<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
import Drawer from "@/components/Drawer.vue";
import {ref,reactive} from "vue";
const drawer = ref(null);
const editRef = ref(null);
const rules = reactive({
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

const editFormData = reactive({
  pid : "",
  name : "",
  order : 50
})

const editSubmit = ()=>{
  editRef.value.validate(valid => {
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
const editDrawerOpen = ()=> drawer.value.openDrawer();
</script>
<template>
    <el-card
        :body-style="{height: h+'px',padding:'0'}"
        shadow="never"
    >
      <el-header class="imageHeader">
        <el-button type="primary" size="small" @click="editDrawerOpen">添加图片分类</el-button>
        <el-button type="danger" size="small">上传图片</el-button>
      </el-header>
      <el-container>
         <ImageAside :height="h-65"/>
         <ImageMain :height="h-65"/>
      </el-container>
      <Drawer ref="drawer" title="图片分类 添加" @submit="editSubmit()">
        <el-form
            ref="editRef"
            :model="editFormData"
            :rules = "rules"
            label-width="auto"
        >
          <el-form-item label="图片分类" prop="pid">
            <el-select v-model="editFormData.pid" placeholder="选择分类" style="width: 240px">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="name" label="填写分类">
            <el-input v-model="editFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="分类优先级" prop="order">
            <el-input-number v-model="editFormData.order"></el-input-number>
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