<script setup>
import useManagerStore from "@/store/manager.js";
import { watch } from 'vue';
const managerStore = useManagerStore();

// 상태 감시 설정
watch(() => managerStore.$state, () => {
  managerStore.saveState();
}, { deep: true });
</script>
<template>
  <router-view></router-view>
</template>
<style scoped>
::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
