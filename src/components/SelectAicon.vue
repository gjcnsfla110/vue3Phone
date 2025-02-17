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
    <div class="selectIconBox">
      <div class="iconPhoto" v-if="modelValue">
        <el-icon :size="20">
          <component :is="modelValue" />
        </el-icon>
      </div>
      <el-select :modelValue="modelValue" placeholder="选择图标"  @change="chageIcon" style="width:300px">
        <el-option
            v-for="icon in icons"
            :key="icon"
            :label="icon"
            :value="icon"
        >
           <div style="display: flex; align-items: center; justify-content: space-between;">
              <el-icon >
                <component :is="icon"/>
              </el-icon>
              <span>{{ icon }}</span>
           </div>
        </el-option>
      </el-select>
    </div>
</template>

<style scoped lang="scss">
.selectIconBox{
  display: flex;
  align-items: center;
  .selectIcon{
     align-items: center;
  }
  .iconPhoto{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 15px;
  }
}

</style>