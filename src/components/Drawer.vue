<script setup>
import {ref} from "vue";
defineProps({
  title : {
    type: String,
    default:""
  },
  size:{
    type: String,
    default:"45%"
  },
  destroyOnClose:{
    type: Boolean,
    default:false
  },
  submitButton:{
    type: String,
    default:"确认"
  }
})
const emit = defineEmits(["submit"])

const isDrawer = ref(false);
const loading = ref(false);
const openDrawer = ()=>{
  isDrawer.value = true;
}
const closeDrawer = () => {
  isDrawer.value = false;
}
const showLoading = () => loading.value = true;
const closeLoading = () => loading.value = false;
const submit = ()=> emit('submit');

defineExpose({
  openDrawer,
  closeDrawer,
  showLoading,
  closeLoading
})


</script>

<template>
  <el-drawer
      v-model="isDrawer"
      :title="title"
      :size="size"
      :close-on-click-modal="false"
      :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{ submitButton }}</el-button>
        <el-button @click="closeDrawer">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<style scoped lang="scss">
    .formDrawer{
      width: 100%;
      height: 100%;
      position: relative;
      .body{
        padding:50px;
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 80px;
        overflow-y: auto;
      }
      .actions{
        padding-left: 100px;
        height: 80px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
</style>