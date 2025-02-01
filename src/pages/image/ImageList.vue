<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;
</script>
<template>
    <el-card
        :body-style="{height: h+'px',padding:'0'}"
        shadow="never"
    >
      <el-header class="imageHeader">
        <el-button type="primary" size="small">添加图片分类</el-button>
        <el-button type="danger" size="small">上传图片</el-button>
      </el-header>
      <el-container>
         <ImageAside :height="h-65"/>
         <ImageMain :height="h-65"/>
      </el-container>
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