<script setup>
  defineOptions({
    name: 'ImageMain',
  })
  defineProps({
    height:{
      type: Number,
    }
  })
  import {ref} from "vue";
  import {imageList} from "@/api/imageClass.js";
  //메뉴클릭되였는지 여부체크
  const activeClass = ref(0);
  const loding =ref(false);

  //페이징처리
  const currentPage = ref(1);
  const totalPage = ref(0);
  const limitPage = ref(10);

  //이미지 리스트 갖고오기
  function getImagesList(id){
     loding.value = true;
     activeClass.value = id;
     let data = {
        id:id,
        page:currentPage.value,
        limit:limitPage.value,
     };
     imageList(data).then((res)=>{

     }).finally(()=>{
       loding.value = false;
     })
  }

  defineExpose({
     getImagesList
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
          <el-card :body-style="{ 'padding':0, width:'100%',height:'100%'}" class="imgItem" shadow="hover" v-for="a in 12">
            <div class="imgItem_top">
              <el-image class="imgItem_img" src="https://imgnn.seoul.co.kr/img/upload/2024/08/04/SSC_20240804172159.png" fit="cover" />
            </div>
            <div class="imgItem_name">
              fdasfdafd
            </div>
            <div class="imgItem_bottom">
               <el-button color="#626aef"  plain text>重命名</el-button>
               <el-button color="#626aef"  plain text>删除</el-button>
            </div>
          </el-card>
        </div>
        <div class="imgMain-bottom">
          <el-pagination background layout="prev, pager, next" v-model:page-size="limitPage" v-model:current-page="currentPage" :total="totalPage" />
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