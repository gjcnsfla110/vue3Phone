<script setup>
  defineOptions({
    name: 'ImageMain',
  })

  const props = defineProps({
    height:{
      type: Number,
    },
    openChoose:{
      type: Boolean,
      default: false
    },
    limit:{
      type: Number,
      default:1
    }
  })
  import {computed, ref} from "vue";
  import {imageList} from "@/api/imageClass.js";
  import {deleteImages,updateImage} from "@/api/image.js";
  import {showMsg,showMessageboxPrompt} from "@/composables/utill.js";
  import {showMessage} from "@/composables/utill.js";
  //메뉴클릭되였는지 여부체크
  const activeClass = ref(0);
  const loding =ref(false);
  //이미지 리스트
  const images = ref([]);
  //페이징처리
  const currentPage = ref(1);
  const totalPage = ref(0);
  const limitPage = ref(12);

  //페이지 change될때
  function pageChange(page){
      currentPage.value = page;
      getImagesList(activeClass.value);
  }

  //이미지 리스트 갖고오기
  function getImagesList(id){
     loding.value = true;
     if(id !== activeClass.value){
       activeClass.value = id;
     }
     let data = {
        id:id,
        page:currentPage.value,
        limit:limitPage.value,
     };
     imageList(data).then((res)=>{
        images.value = res.list.map(item=>{
             item.checked = false;
             return item;
        });
        totalPage.value = res.total;
     }).finally(()=>{
       loding.value = false;
     })
  }

  //이미지 삭제부분
  const deleteImage = (id)=>{
      deleteImages({'ids':[id]}).then((res)=>{
          loding.value = true;
          showMsg("删除成功");
          getImagesList(activeClass.value);
      }).finally(()=>{
         loding.value = false;
      })
  }

  //이미지 업데이트 부분
  const updateName = (item)=>{
    showMessageboxPrompt("修改图片名称",item.original_name).then(({value})=>{
        updateImage(item.id,value).then(()=>{
            loding.value = true;
            showMsg("修改成功");
            getImagesList(activeClass.value);
        }).finally(()=>{
            loding.value = false;
        })
    })
  }


  const emit = defineEmits([
      "imgChecked"
  ])
  //이미지 체크부분
  const imgUrlChecks = computed({
      get(){
         return images.value.filter(item=>item.checked)
      },
      set(val){
         images.value.forEach(item=>{
            item.checked = val;
         })
      }
  });
  const handleCheck = (item)=>{
      if(item.checked && imgUrlChecks.value.length > props.limit){
          item.checked = false;
          return showMessage(`最多只能选中${props.limit}张`,"error")
      }
      emit('imgChecked',imgUrlChecks.value);
  }

  defineExpose({
    getImagesList,
    imgUrlChecks
  })
</script>
<template>
    <el-main class="imgMainBox" :style="{height:height+'px'}">
        <div v-if="!activeClass" class="noList" :style="{height:(height-100)+'px'}">
          <el-result
              icon="warning"
              title="图片相册"
              sub-title="请选者 图片菜单！！ 无 图片相册"
              style="margin-left: auto;width: 100%"
          >
            <template #extra>
              <el-button type="primary">选择菜单</el-button>
            </template>
          </el-result>
        </div>
        <div v-loading="loding" v-else class="imgMain-top" :style="{height:(height-100)+'px'}">
          <el-card :body-style="{ 'padding':0, width:'100%',height:'100%'}" class="imgItem" shadow="hover" v-for="item in images">
            <div class="imgItem_top">
              <el-image class="imgItem_img" :src="item.url" fit="cover" />
            </div>
            <div class="imgItem_name">
              {{item.original_name}}
            </div>
            <div class="imgItem_bottom">
              <el-checkbox style="margin-right: 15px" v-if="openChoose"  v-model="item.checked" @change="handleCheck(item)"/>
              <el-button color="#626aef"  plain text @click="updateName(item)" >重命名</el-button>
              <el-popconfirm title="是否要删除图片？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteImage(item.id)">
                <template #reference>
                  <el-button color="#626aef"  plain text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </div>
        <div class="imgMain-bottom">
          <el-pagination @change="pageChange" background layout="prev, pager, next" v-model:page-size="limitPage" v-model:current-page="currentPage" :total="totalPage" />
        </div>
    </el-main>
</template>
<style scoped lang="scss">
.imgMainBox{
  position: relative;
}
.noList{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  border-top:2px solid #545c64;
  border-right:2px solid #545c64;
  padding-top: 100px;
}
.imgMain-top{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow-y: auto;
  border-top:2px solid #545c64;
  border-right:2px solid #545c64;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 10px;
  .imgItem{
    width: 100%;
    height: 100%;
    position: relative;
    .imgItem_top{
       width: 100%;
       height: 80%;
      .imgItem_img{
        width: 100%;
        height: 100%;
      }
    }
    .imgItem_name{
      width: 100%;
      height: 35px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20%;
      color: white;
      padding-left:15px;
      font-size: 18px;
      line-height: 35px;
      background-color: rgb(0,0,0,0.2);
    }
    .imgItem_bottom{
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}
.imgMain-bottom{
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right:2px solid #545c64;
  border-bottom:2px solid #545c64;
}
</style>