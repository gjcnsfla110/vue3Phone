<script setup>
  defineOptions({
    name: 'Search',
  })
  defineProps({
     model:Object,
     backColor:{
       type: String,
       default:'white',
     }
  })
  const emit = defineEmits(['search','reset'])
  import {ref, useSlots} from "vue";
  //검색란에 더보기 기능
  const hasShowSlots = ref(false);
  //모는 슬롯값을 갖고와서 show 슬롯을 작성했는지 확인하는부분
  const slots = useSlots();
  const hasSearch = ref(!!slots.show);
  const serchForm = ()=>{
    emit('search');
  }
  const resetForm = ()=>{
    emit('reset');
  }

</script>

<template>
  <el-card :style="{padding:'15px',backgroundColor:backColor}">
     <el-form :model="model">
      <el-row :gutter="20">
        <slot/>
        <template v-if="hasShowSlots">
          <slot name="show" />
        </template>
      </el-row>
       <el-row justify="center" style="margin-top:30px">
         <el-col :span="10">
           <div style="display: flex; justify-content: center;">
             <el-button @click="serchForm" type="primary" size="large">搜索</el-button>
             <el-button @click="resetForm" size="large" style="margin-left: 30px">重设</el-button>
             <el-button v-if="hasSearch" @click="hasShowSlots = !hasShowSlots" style="margin-left: 20px" text size="large">
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
  </el-card>
</template>

<style scoped lang="scss">

</style>