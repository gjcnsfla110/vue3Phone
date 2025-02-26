<script setup>
    defineOptions({
      name: 'ManagerList',
    })
    import Search from "@/components/Search.vue";
    import ListHeader from "@/components/ListHeader.vue";
    import SearchItem from "@/components/SearchItem.vue";
</script>

<template>
    <el-card shadow="always">
      <Search>
         <template #default>
            <SearchItem label="xcl">
               <el-input placeholder="112"></el-input>
            </SearchItem>
         </template>
         <template #show>
            <SearchItem label="xcl">
               <el-input placeholder="112"></el-input>
            </SearchItem>
         </template>
      </Search>
      <ListHeader/>
      <el-table  border style="width: 100%">
        <el-table-column  label="Date" width="500">

        </el-table-column>
        <el-table-column  label="Name" width="500">

        </el-table-column>
        <el-table-column  label="Address" width="200">

        </el-table-column>
        <el-table-column  label="Address">

        </el-table-column>
      </el-table>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </el-card>
</template>

<style scoped lang="scss">

</style>