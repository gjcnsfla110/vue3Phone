<script setup>
    defineOptions({
      name: 'ManagerList',
    })
    import Search from "@/components/Search.vue";
    import ListHeader from "@/components/ListHeader.vue";
    import SearchItem from "@/components/SearchItem.vue";
    import {useInitTable} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    const {
      searchForm,
      resetSearchForm,
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
    } = useInitTable({
      defaultSearchForm:{
         username:""
      }
    });

    

    const data = [{
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
    },
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
      },
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
      },
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
      },{
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
      }
    ]
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
      <el-table :data="data"  border style="width: 100%">
        <el-table-column prop="date"  label="Date" width="500">

        </el-table-column>
        <el-table-column  prop="name" label="Name" width="500">

        </el-table-column>
        <el-table-column prop="California"  label="Address" width="200">
            <el-switch/>
        </el-table-column>
        <el-table-column  label="Address" align="center">
            <template #default>
              <el-button type="primary" text>修改</el-button>
              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定删除管理员吗？"
                  @confirm=""
              >
                <template #reference>
                  <el-button type="danger" plain round size="small">删除</el-button>
                </template>
              </el-popconfirm>
              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="管理员初始设置密码？"
                  @confirm=""
              >
                <template #reference>
                  <el-button color="#626aef" :dark="isDark" plain>初始密码</el-button>
                </template>
              </el-popconfirm>
            </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;align-items: center; justify-content: center; margin: 10px 0;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </el-card>
    <Drawer>

    </Drawer>
</template>

<style scoped lang="scss">

</style>