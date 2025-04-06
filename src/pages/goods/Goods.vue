<script setup>
    import SearchItem from "@/components/SearchItem.vue";

    defineOptions({
      name: 'Goods',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import Search from "@/components/Search.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";

</script>
<template>
    <el-card>
       <Search backColor="rgb(248,248,248)">
          <search-item>
              <el-input></el-input>
          </search-item>
       </Search>
       <ListHeader></ListHeader>
       <el-table
       >
          <el-table-column></el-table-column>
       </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
</template>

<style scoped lang="scss">
.pagination{
  height: 80px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>