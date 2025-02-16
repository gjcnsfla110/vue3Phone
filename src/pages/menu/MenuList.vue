<script setup>
    defineOptions({
      name: 'MenuList',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import Drawer from "@/components/Drawer.vue";


</script>

<template>
  <el-card shadow="always">
    <ListHeader/>
    <el-tree
    >
       <template #default>

       </template>
    </el-tree>
  </el-card>
  <Drawer>

  </Drawer>
</template>

<style scoped lang="scss">

</style>