<script setup>
import {ref} from "vue";

defineProps({
    title:{
      type: String,
      default:""
    },
    width:{
      type: String,
      default:"75%"
    },
    height:{
      type: String,
      default:"75%"
    },
    top:{
      type: String,
      default:"5vh"
    },
    card:{
      type: Boolean,
      default:true
    }
});
const emit = defineEmits(["submit"]);
const submit = ()=> emit("submit");
const dialongValue = ref(false);
const openDialog = ()=> dialongValue.value = true;
const closeDialog = ()=> dialongValue.value= false;


defineExpose({
  openDialog,
  closeDialog
})
</script>

<template>
  <el-dialog
      :title="title"
      v-model="dialongValue"
      :width="width"
      :top="top"
      :height="height"
      style="padding: 50px"
  >
    <el-container style="margin-top: 30px;margin-bottom: 50px">
       <el-card style="width: 100%;height: 100%;" v-if="card">
          <slot></slot>
       </el-card>
        <div style="width: 100%" v-else>
           <slot></slot>
        </div>
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

</style>