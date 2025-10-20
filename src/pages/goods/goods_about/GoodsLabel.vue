<script setup>
    import {ref} from "vue";

    defineOptions({
       name: "GoodsLabel",
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import {getLabelList,createLabel,updateLabel,deleteLabel} from "@/api/goods/label.js";
    const colors = ref([]);
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
        total.value = res.total;
        colors.value = res.colors;
       },
       delete:deleteLabel,
       getList:getLabelList,
    })
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
          name:"",
          color:""
        },
        rules:{
          name:{
            required: true,
            message:'填写标签',
            trigger:"blur"
          },
          color:{
            required: true,
            message:'색상을 선택하세요',
            trigger:"change"
          }
        },
        getDataList:getData,
        create:createLabel,
        update:updateLabel,
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
         <el-table-column
             label="标签名称"
             prop="name"
             width="500"
         >
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
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="auto"
        >
            <el-form-item label="标签名称" prop="name">
               <el-input v-model="formData.name" placeholder="填写标签名称"></el-input>
            </el-form-item>
            <el-form-item label="색상" prop="color">
              <el-select v-model="formData.color" placeholder="색상선택" style="width: 240px">
                <el-option
                    v-for="item in colors"
                    :key="item.id"
                    :label="item.color"
                    :value="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="색상보기">
                 <div class="bgColor" :style="{'background-color':formData.color}">
                 </div>
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
.bgColor{
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
</style>