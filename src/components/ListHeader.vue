<script setup>
   defineOptions({
        name: 'ListHeader',
   })

   import {computed} from "vue";
   const props =defineProps({
       layout:{
         type: String,
         default:"create,refresh"
       }
   })
   const btn = computed(()=>props.layout.slice(","));
   const emit = defineEmits(['create','refresh','delete','download'])
</script>

<template>
    <div class="list-header">
        <div class="list-left">
            <el-button v-if="btn.includes('create')" size="small" type="primary" @click="emit('create')">添加</el-button>
            <el-popconfirm v-if="btn.includes('delete')" @confirm="emit('delete')" title="您确定删除吗"  confirm-button-text="确认"  cancel-button-text="取消">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
            <slot></slot>
        </div>
        <div class="list-right">
          <el-tooltip v-if="btn.includes('refresh')" effect="dark" content="刷新数据" placement="top">
            <el-button size="small" text @click="$emit('refresh')">
              <el-icon :size="15">
                <Refresh />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip v-if="btn.includes('download')" effect="dark" content="导出数据" placement="top">
            <el-button size="small" text @click="$emit('download')">
              <el-icon :size="15">
                <Download />
              </el-icon>
            </el-button>
          </el-tooltip>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .list-header{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

    }
</style>