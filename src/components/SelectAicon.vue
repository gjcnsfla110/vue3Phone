<script setup>
  defineOptions({
     name: "SelectAicon",
  })
  defineProps({
     modelValue :String
  })
  const emit = defineEmits(["update:modelValue"])
  import {ref} from "vue";
  import * as iconList from '@element-plus/icons-vue'
  const icons = ref(Object.keys(iconList));
  const chageIcon = (icon)=>{
      emit("update:modelValue",icon);
  }
</script>

<template>
    <div>
      <el-icon :size="20" v-if="modelValue">
        <component :is="modelValue" />
      </el-icon>
      <el-select :modelValue="modelValue" placeholder="选择图标"  @change="changeIcon">
        <el-option
            v-for="item in icons"
            :key="item"
            :label="item"
            :value="item"
        />
          <div>
            <el-icon>
              <component :is="item"/>
            </el-icon>
            <span>{{ item }}</span>
          </div>
      </el-select>
    </div>
</template>

<style scoped lang="scss">

</style>