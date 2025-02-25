<script setup>
    defineOptions({
      name: 'ManagerList',
    })
    import Search from "@/components/Search.vue";
    import ListHeader from "@/components/ListHeader.vue";
</script>

<template>
    <el-card shadow="always">
      <Search/>
      <ListHeader/>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </el-card>
</template>

<style scoped lang="scss">

</style>