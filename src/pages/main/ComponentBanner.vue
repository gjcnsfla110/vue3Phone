<script setup>
    import {getBannerList,createBanner,updateBanner,updateBannerStatus,deleteBanner} from "@/api/main/componentBanner.js";
    import {computed, reactive, ref} from "vue";
    import Drawer from "@/components/Drawer.vue";
    import {showMsg} from "@/composables/utill.js";
    import CheckImg from "@/components/CheckImg.vue";
    const props = defineProps({
        componentId:{
          type:Number,
          default:0
        }
    })
    const bannerList = ref([]);
    const formDrawerRef = ref("");
    const formRef = ref("");
    const bannerId = ref("");
    const formTitle = computed(()=>bannerId.value ? "배너 업데이트":"배너 추가");
    const defaultFormData = reactive({
        image:"",
        link:"",
        status:1,
        ranking:50
    })
    const formData = reactive({
        image:"",
        link:"",
        status:1,
        ranking:50
    });
    const formRules = ref({
        link:{
           required: true,
           message:"이미지 연관링크를 입력하세요",
           trigger:"blur"
        }
    })

    const getList = ()=>{
       getBannerList(props.componentId).then((res)=>{
           bannerList.value=res.list;
       });
    }

    const createComponentBanner = ()=>{
        bannerId.value = 0;
        resetFormData(defaultFormData);
        formDrawerRef.value.openDrawer();
    }

    const updateComponentBanner = (row)=>{
        bannerId.value = row.id;
        resetFormData(row);
        formDrawerRef.value.openDrawer();
    }
    const handleSubmit = ()=>{
      formRef.value.validate((valid)=>{
        if(!valid) return;
        formDrawerRef.value.showLoading();
        let submit = bannerId.value ? updateBanner(bannerId.value,formData) : createBanner(props.componentId,formData);
        submit.then((res)=>{
          showMsg(formTitle.value + "성공");
          getList();
          formDrawerRef.value.closeDrawer();
        }).finally(()=>{
          formDrawerRef.value.closeLoading();
        })
      });
    }
    const updateComponentBannerStatus = (status,item)=>{
        updateBannerStatus(item.id,status).then((res)=>{
            showMsg("状态修改成功");
            item.status = status;
        })
    }

    const deleteComponentBanner = (id)=>{
        deleteBanner(id).then((res)=>{
            showMsg("删除成功");
            getList();
        })
    }

    const resetFormData = (data = false)=>{
      if(formRef.value) formRef.value.clearValidate();
      for(const key in defaultFormData){
        formData[key] = data[key];
      }
    }
    getList();
</script>

<template>
  <div style="padding-left: 10px"><el-button type="danger" round @click="createComponentBanner">배너추가</el-button></div>
  <el-table
      :data="bannerList"
  >
    <el-table-column type="index" width="50" />
    <el-table-column label="이미지" width="300" align="center">
        <template #default="{row}">
          <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover" />
        </template>
    </el-table-column>
    <el-table-column label="링크" width="1000" prop="link" align="center"></el-table-column>
    <el-table-column label="설정" align="center">
      <template #default="{row}">
        <el-switch
            v-model="row.status"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-right: 20px "
            :active-value="1"
            :inactive-value="0"
            @change="updateComponentBannerStatus(row.status,row)"
        />
        <el-button
            type="primary"
            text
            @click="updateComponentBanner(row)"
        >
          修改
        </el-button>
        <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="deleteComponentBanner(row.id)">
          <template #reference>
            <el-button
                type="danger"
                text
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
      <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="auto">
          <el-form-item label="이미지">
              <CheckImg v-model="formData.image"></CheckImg>
          </el-form-item>
          <el-form-item label="이미지링크" prop="link">
              <el-input v-model="formData.link"></el-input>
          </el-form-item>
          <el-form-item label="상태">
              <el-switch v-model="formData.status" :active-value="1"  :inactive-value="0"/>
          </el-form-item>
          <el-form-item label="순위">
              <el-input-number v-model="formData.ranking"/>
          </el-form-item>
      </el-form>
  </Drawer>
</template>

<style scoped lang="scss">

</style>