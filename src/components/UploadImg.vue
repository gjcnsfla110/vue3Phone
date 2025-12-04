<script setup>
import {Plus} from "@element-plus/icons-vue";
import {ref,defineProps,defineEmits,computed} from "vue";

const props = defineProps({
  images:{
    type: Array,
    default: () => []
  },
  limit:{
    type: Number,
    default:20
  },
  multi:{
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(["update:images"]);

/*---------------------- 사진업로드 부분 ------------------------------*/
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const fileList = computed({
  // Getter: 부모의 images Prop을 읽습니다.
  get() {
    return props.images;
  },
  // Setter: 외부 (예: El-Upload의 remove/success 핸들러)에서 배열이 변경될 때
  // 이 변경 사항을 부모에게 즉시 알립니다.
  set(newValue) {
    emits("update:images", newValue);
  }
});

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url || uploadFile;
  dialogVisible.value = true;
};

</script>

<template>
    <el-card>
      <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :auto-upload = "false"
          :on-preview="handlePictureCardPreview"
          :multiple = "multi"
          :limit="limit"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-card>
</template>

<style scoped lang="scss">

</style>