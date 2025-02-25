<script setup>
  defineOptions({
    name: 'SearchItem',
  })
  defineProps({
    label:{
      type: String,
      default:""
    }
  })
</script>

<template>
  <el-col :span="8">
    <el-form-item :label="label">
        <slot/>
    </el-form-item>
  </el-col>
</template>

<style scoped lang="scss">

</style>