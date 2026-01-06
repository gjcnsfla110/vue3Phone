<script setup>
    import ImageAside from "@/components/ImageAside.vue";
    import ImageMain from "@/components/ImageMain.vue";
    //-----------------공용이미지 start---------------------------//
    import Drawer from "@/components/Drawer.vue";
    import {ref, reactive, onMounted} from "vue";
    import {imageClassAll,addImageClass} from "@/api/imageClass.js";
    import {addImage} from "@/api/image.js";
    import {showMsg,showMessage} from "@/composables/utill.js";
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
          trigger: 'blur'
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
      image_class_id : 0,
      name : "",
      url : ""
    })

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

    //사진업로드 submit
    const editPhotoSubmit = ()=>{
      editPhotoRef.value.validate(valid => {
        if (!valid) return;
        if(!isClassA.value) return;
        editPhotoFormData.image_class_id = isClassA.value;
        addImage(editPhotoFormData).then(res => {
          showMsg("图片添加成功");
          imageMainRef.value.getImagesList(isClassA.value);
        }).finally(res=>{
          drawerPhoto.value.closeDrawer();
        })
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


    //---------------------------- 공용이미지 end -------------------------------//


    defineOptions({
      name: 'CheckImg',
    })
    const props = defineProps({
       modelValue:[String,Array],
       limit:{
           type: Number,
           default:1
       },
       preview:{
         type: Boolean,
         default: true
       }
    })
    const emit = defineEmits([
      "update:modelValue"
    ])
    let urls = [];
    const dialongValue = ref(false);
    const openDialog = ()=> dialongValue.value = true;
    const closeDialog = ()=> dialongValue.value= false;

    const checkUrl = (e)=>{
      urls = e.map(item=>item.url);
    }
    const submit = ()=>{
      let value = []
      if(props.limit == 1){
        value = urls[0]
      } else{
        //부모에서 넘겨온 props.modelValue 값이 null혹은 undifind일때 작업
        let propsImgData = props.modelValue ? props.modelValue : [];
        value = props.preview ? [...propsImgData,...urls] : [...urls]
        if(value.length > props.limit){
          let limit = props.preview ? (props.limit - propsImgData.length) : props.limit
          return showMessage("最多还能选择"+ limit + "张")
        }
      }
      if(value && props.preview){
        emit("update:modelValue",value)
      }
      imageMainRef.value.imgUrlChecks = false;
      urls=[];
      closeDialog();
    };

    const removerUrl = (url)=> emit("update:modelValue",props.modelValue.filter(u=> u != url))
    const showPreview = ref(false)
    const showIndex = ref(0)
    const show = (index)=>{
      showPreview.value = true
      showIndex.value = index;
    }
</script>

<template>
    <div class="banner">
         <div v-if="modelValue && preview">
           <div v-if="typeof modelValue == 'string'" class="imsOneC">
            <el-image class="imgOne" :src="modelValue" fit="cover"></el-image>
           </div>
           <div v-else class="imgContent">
             <div v-for="(url,index) in modelValue" :key="index" class="imgs">
               <div class="imgIcon">
                 <div class="iconC">
                   <el-icon :size="30" @click="show(index)"  color="rgb(230,230,230)" style="margin-left: 15px;cursor: pointer;"><View /></el-icon>
                   <el-icon :size="30" color="rgb(230,230,230)" style="margin-right: 15px;cursor: pointer;" @click="removerUrl(url)"><Delete /></el-icon>
                 </div>
               </div>
               <el-image class="elImg" :src="url" fit="cover" ></el-image>
             </div>
           </div>
         </div>
        <div>
          <el-image-viewer
              v-if="showPreview"
              :url-list="modelValue"
              show-progress
              :initial-index="showIndex"
              @close="showPreview = false"
              fit="cover"
          />
        </div>
         <div v-if="preview" class="addPlus" @click="openDialog">
            <el-icon :size="50" color="rgb(150,150,150)" class="plusIcon"><Plus /></el-icon>
         </div>
    </div>
    <el-dialog
        title="选择图片"
        v-model="dialongValue"
        width="80%"
        top="5vh"
        height="80%"
    >
      <el-container>
        <el-card
            :body-style="{height: h+'px',padding:'0'}"
            shadow="never"
            style="width: 100%"
        >
          <el-header class="imageHeader">
              <div><h1>이미지추가</h1></div>
          </el-header>
          <el-container>
            <ImageAside ref="imagesClassRef" :height="h-65" @classActive="imageClassActive"/>
            <ImageMain ref="imageMainRef" openChoose :limit="limit" :height="h-65" @imgChecked="checkUrl"/>
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
      </el-container>

      <template #footer>
            <span>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
      </template>
    </el-dialog>
</template>

<style scoped lang="scss">
  .banner{
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    .imsOneC{
      width: 120px;
      height: 120px;
      margin-right: 10px;
      .imgOne{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
      }
    }
    .imgContent{
      display: flex;
      align-items: center;
      justify-content: start;
      flex-wrap: wrap;
      .imgs{
        width: 120px;
        height: 120px;
        position: relative;
        margin-right: 10px;
        .imgIcon {
          display: none;
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 5px;
          z-index: 100;
          background-color: rgb(50,50,50,0.6);
          .iconC{
             width: 100%;
             height: 50px;
             margin-top: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
        .elImg{
          width: 100%;
          height: 100%;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      }
      .imgs:hover .imgIcon {
        display: block;
      }
    }
    .addPlus{
      display: flex;
      width: 120px;
      height: 120px;
      border-radius: 5px;
      border: 1px solid #ccc;
      position: relative;
      .plusIcon{
        position: absolute;
        left: 35px;
        top: 35px;
      }
    }
    .addPlus:hover{
      cursor: pointer;
      background-color: rgb(230,230,230);
    }
  }
  .imageHeader{
    height: 65px;
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>