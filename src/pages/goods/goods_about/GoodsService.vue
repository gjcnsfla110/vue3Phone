<script setup>
    defineOptions({
      name: 'GoodsService',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import {getServiceList,createService,updateService,deleteService} from "@/api/goods/service.js";
    import Drawer from "@/components/Drawer.vue";
    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      afterDataList:(res)=>{
        dataList.value = res.list;
        dataList.value.forEach((item)=>{
            item.description = JSON.parse(item.description);
        })
      },
      getList:getServiceList,
      delete:deleteService,
    });

    const {
      formDrawerRef,
      formRef,
      formData,
      formRules,
      formTitle,
      handleCreate,
      handleUpdate,
      handleSubmit
    } = useInitFrom({
       form:{
         title:'',
         description:'',
       },
       rules:{
          title:{
            required: true,
            message:'填写服务名称',
            trigger:"blur"
          },
          description:{
            required: true,
            message:'填写服务详细内容',
            trigger:"blur"
          }
       },
      getDataList:getData,
      create:createService,
      update:updateService,
    });
    getData();
</script>

<template>
    <el-card>
        <ListHeader @create="handleCreate" @reset="getData"></ListHeader>
        <el-table
          v-loading="loading"
          :data="dataList"
          border
        >
            <el-table-column label="服务名称" prop="title" width="350">

            </el-table-column>
            <el-table-column label="服务介绍" prop="description" align="center" width="600">
                 <template #default="{row}">
                   <el-tooltip
                       class="box-item"
                       effect="dark"
                       :content="row.description.description"
                       placement="top-start"
                   >
                     <el-text truncated >{{row.description.description}}</el-text>
                   </el-tooltip>
                 </template>
            </el-table-column>
            <el-table-column label="设置" align="center">
              <template #default="{row}">
                <el-button type="primary" plain @click="handleUpdate({id:row.id,title:row.title,description:row.description.description})">修改</el-button>
                <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(row.id)">
                  <template #reference>
                    <el-button
                        type="danger"
                        plain
                    >
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
        </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit" >
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="auto"
        >
          <el-form-item label="服务名称" prop="title">
            <el-input placeholder="填写服务名称" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="服务介绍" prop="description">
            <el-input placeholder="填写服务介绍-280字以内" type="textarea" :rows="5" maxlength="280" show-word-limit v-model="formData.description"></el-input>
          </el-form-item>
        </el-form>
    </Drawer>
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