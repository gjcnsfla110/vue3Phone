<script setup>
    import Drawer from "@/components/Drawer.vue";

    defineOptions({
      name: 'ColorList',
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import{getColorList,createColor,updateColor,deleteColor} from "@/api/goods/color.js";

    const {
      dataList,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleDelete,
    } = useInitTable({
      delete:deleteColor,
      getList:getColorList,
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
        color:"",
        english:"",
        code:''
      },
      rules:{
        color:{
          required: true,
          message:'填写颜色名称',
          trigger:"blur"
        },
        english:{
          required: true,
          message:'填写英文名称',
          trigger:"blur"
        },
        code:{
          required: true,
          message:'填写颜色code',
          trigger:"blur"
        }
      },
      getDataList:getData,
      update:updateColor,
      create:createColor,
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
        <el-table-column label="颜色" prop="color" width="260">

        </el-table-column>
        <el-table-column align="center" label="英文颜色" prop="english" width="260">

        </el-table-column>
        <el-table-column align="center" label="颜色Code" prop="code" width="260">

        </el-table-column>

        <el-table-column label="设置" align="center">
          <template #default="{row}">
             <el-button type="primary" plain @click="handleUpdate(row)">修改</el-button>
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
   <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
     <el-form
       :model="formData"
       :rules="formRules"
       ref="formRef"
       label-width="auto"
     >
        <el-form-item style="width: 60%" label="颜色名称" prop="color">
           <el-input v-model="formData.color"></el-input>
        </el-form-item>
        <el-form-item style="width: 60%" label="英文名称" prop="english">
           <el-input v-model="formData.english"></el-input>
        </el-form-item>
        <el-form-item style="width: 60%" label="颜色code" prop="code">
           <el-input v-model="formData.code"></el-input>
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