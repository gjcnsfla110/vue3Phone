<script setup>
import {ref} from "vue";
defineProps({
  list:{
    type: Array,
    default:()=>[]
  },
})
const emit = defineEmits(['deleteItem'])

</script>

<template>
  <el-button type="primary" @click="" style="margin-top: 10px">아이템추가</el-button>
  <el-table :data="list" >
    <el-table-column label="상품명" prop="title" width="300"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>