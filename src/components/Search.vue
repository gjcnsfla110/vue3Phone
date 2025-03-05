<script setup>
  defineOptions({
    name: 'Search',
  })
  defineProps({
     model:Object,
  })
  const emit = defineEmits(['search,reset'])
  import {ref, useSlots} from "vue";
  //검색란에 더보기 기능
  const hasShowSlots = ref(false);
  //모는 슬롯값을 갖고와서 show 슬롯을 작성했는지 확인하는부분
  const slots = useSlots();
  const hasSearch = ref(!!slots.show);
</script>

<template>
  <el-form :model="model">
    <el-row :gutter="20">
        <slot/>
        <slot name="show" v-if="hasShowSlots">
        </slot>
        <el-col :span="8" :offset="hasShowSlots ? 0 : 8">
          <div style="display: flex; justify-content: end;">
             <el-button @click="emit('search')" type="primary">搜索</el-button>
             <el-button @click="emit('reset')">重设</el-button>
             <el-button v-if="hasSearch" @click="hasShowSlots = !hasShowSlots" text>
                {{hasShowSlots ? '收起' : "展开" }}
                <el-icon>
                   <ArrowUp v-if="hasShowSlots"/>
                   <ArrowDown v-else/>
                </el-icon>
             </el-button>
          </div>
        </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>