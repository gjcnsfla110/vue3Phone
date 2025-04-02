<script setup>
    defineOptions({
       name: "SpectList",
    })
    import ListHeader from "@/components/ListHeader.vue";
    import {useInitTable, useInitFrom, listTrees, menuListTrees, orderTrees} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import {getSpecList,updateSpec,updateStatus,deleteSpec,createSpec} from "@/api/goods/specList.js";
    import useSpecData from "@/store/spec.js";
    import {ref} from "vue";
    //스펙부분
    const {cpuData,cameraData,ramData,waterData,batteryData,displayData,storageData,typeData} = useSpecData();

    const onSelect = ref({
      is_cpu:1,
      is_camera:1,
      is_ram:1,
      is_storage:1,
      is_display:1,
      is_battery:1,
      is_water:1,
      is_type:1,
    })

    //스펙리스트
    const dataList = ref([]);
    const specIds = ref([]);
    const {
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
    } = useInitTable({
      afterDataList:(res)=>{
        specIds.value = [{id:0,name:'最上级配置参数菜单',child:[]}].concat(listTrees(res.list,'spec_id','child'));
        dataList.value = menuListTrees(res.menus,res.list,'spec_id');
        orderTrees(dataList);
        total.value = res.total;
      },
      getList:getSpecList,
      delete:deleteSpec,
      updateStatus:updateStatus,
    });

    const{
      formDrawerRef,
      formRef,
      formData,
      formRules,
      formTitle,
      handleCreate,
      handleUpdate,
      handleSubmit
    }= useInitFrom({
      form:{
        spec_id:"",
        name:"",
        spec_menu:0,
        model:"",
        cpu:'',
        camera:'',
        ram:'',
        color:'',
        storage:'',
        display:'',
        battery:'',
        water:'',
        type:'',
        weight:'',
        launchDate:'',
        ranking:50,
        status:1,
      },
      rules:{
        spec_id:{
          required: true,
          message:"添加父级菜单",
          trigger:"change"
        },
        name:{
          required: true,
          message:'填写菜单名字',
          trigger:"blur"
        },
        spec_menu:{
          required: true,
          message:'选择菜单或参数选项',
          trigger:"blur"
        },
        model:{
          required: true,
          message:'选择上你名称',
          trigger:"change"
        },
        cpu:{
          required: true,
          message:'',
          trigger:"change"
        },
        camera:{
          required: true,
          message:'',
          trigger:"change"
        },
        ram:{
          required: true,
          message:'',
          trigger:"change"
        },
        color:{
          required: true,
          message:'',
          trigger:"blur"
        },
        storage:{
          required: true,
          message:'',
          trigger:"change"
        },
        display:{
          required: true,
          message:'',
          trigger:"change"
        },
        battery:{
          required: true,
          message:'',
          trigger:"change"
        },
        water:{
          required: true,
          message:'',
          trigger:"change"
        },
        type:{
          required: true,
          message:'填写5G网络手机',
          trigger:"change"
        },
        weight:{
          required: true,
          message:'',
          trigger:"blur"
        },
        launchData:{
          required: true,
          message:'',
          trigger:"blur"
        },
        status:{
          required: true,
          message:'',
          trigger:"change"
        }
      },
      create:createSpec,
      update:updateSpec,
      getDataList:getData,
    });
    getData();

    const childAdd = (id)=>{
        handleCreate();
        formData.spec_id = id;
        formData.status = 1;
    }

    const isJson = (row)=>{
       function newRow(row){
           row.ram = JSON.parse(row.ram);
           row.storage = JSON.parse(row.storage);
           return row;
       }
       handleUpdate(newRow(row));
    }
</script>

<template>
  <el-card>
    <ListHeader @create="handleCreate" @reset="getData"></ListHeader>
    <el-tree
        :data="dataList"
        v-loading="loading"
        node-key="id"
        :props="{label: 'name', children: 'child'}"
    >
      <template #default="{node,data}">
        <div class="custom-tree-node" @click.stop>
          <div style="display: flex;align-items: center;">
            <el-tag type="primary" v-if="data.spec_menu === 1">菜单</el-tag>
            <el-tag type="info" v-else>配置</el-tag>
            <span style="margin-left: 20px" v-if="data.spec_menu === 1">{{data.name}}</span>
            <span style="margin-left: 20px" v-else >{{data.model}}</span>
          </div>
          <div>
            <el-switch
                v-model="data.status"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-right: 20px "
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange(data.status,data)"
            />
            <el-button
                type="info"
                text
                @click="childAdd(data.id)"
            >
              添加
            </el-button>
            <el-button
                type="primary"
                text
                @click="isJson(data)"
            >
              修改
            </el-button>
            <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"  @confirm="handleDelete(data.id)">
              <template #reference>
                <el-button
                    type="danger"
                    text
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>
  </el-card>
  <div class="bottomPage">
    <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" @change="getData" />
  </div>
  <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
       <el-form
           ref="formRef"
           :model="formData"
           :rules="formRules"
           label-width="auto"
       >
          <el-form-item label="上级菜单" prop="spec_id">
            <el-cascader
                v-model="formData.spec_id"
                :options="specIds"
                :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                placeholder="请选择上级菜单"
            />
          </el-form-item>
          <el-form-item label="菜单OR配置" prop="spec_menu">
            <el-radio-group v-model="formData.spec_menu" size="large">
              <el-radio-button label="菜单" :value="1" />
              <el-radio-button label="配置" :value="0" />
            </el-radio-group>
          </el-form-item>
         <el-form-item label="菜单名称" v-if="formData.spec_menu==1" prop="name">
              <el-input v-model="formData.name" placeholder="填写菜单名称"></el-input>
         </el-form-item>
         <el-form-item label="配置名称" v-else prop="model">
              <el-input v-model="formData.model" placeholder="填写配置名称"></el-input>
         </el-form-item>
         <el-form-item label="CPU" prop="cpu" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_cpu" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
             <el-cascader
                 v-model="formData.cpu"
                 :options="cpuData"
                 :props="{value:'name',label:'name',children:'child',emitPath:false}"
                 placeholder="选择CPU"
                 v-if="onSelect.is_cpu == 1"
                 :show-all-levels="false"
                 style="width: 300px"
             />
           <el-input v-model="formData.cpu" v-else placeholder="填写CPU" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="像素" prop="camera" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_camera" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.camera"
               placeholder="选择像素"
               style="width: 300px"
               v-if="onSelect.is_camera == 1"
           >
             <el-option
                 v-for="item in cameraData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.camera" v-else placeholder="填写像素" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="运行内存" prop="ram" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_ram" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.ram"
               placeholder="选择运行内存"
               style="width: 300px"
               multiple
               v-if="onSelect.is_ram == 1"
           >
             <el-option
                 v-for="item in ramData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.ram" v-else placeholder="填写运行内存" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="存储内存" prop="storage" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_storage" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.storage"
               placeholder="选择存储内存"
               style="width: 300px"
               multiple
               v-if="onSelect.is_storage == 1"
           >
             <el-option
                 v-for="item in storageData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.storage" v-else placeholder="填写存储内存" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="屏幕尺寸" prop="display" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_display" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-cascader
               v-model="formData.display"
               :options="displayData"
               :props="{value:'name',label:'name',children:'child',emitPath:false}"
               placeholder="选择屏幕尺寸"
               v-if="onSelect.is_display == 1"
               :show-all-levels="false"
               style="width: 300px"
           />
           <el-input v-model="formData.display" v-else placeholder="填写屏幕尺寸" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="电池量" prop="battery" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_battery" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.battery"
               placeholder="选择电池量"
               style="width: 300px"
               v-if="onSelect.is_battery == 1"
           >
             <el-option
                 v-for="item in batteryData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.battery" v-else placeholder="填写电池量" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="防水级别" prop="water" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_water" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.water"
               placeholder="选择防水级别"
               style="width: 300px"
               v-if="onSelect.is_water == 1"
           >
             <el-option
                 v-for="item in waterData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.water" v-else placeholder="填写防水级别" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="5G或4G" type="type" v-if="formData.spec_menu ==0">
           <el-radio-group v-model="onSelect.is_type" style="margin-right: 10px">
             <el-radio-button label="选项" :value="1" />
             <el-radio-button label="填写" :value="0" />
           </el-radio-group>
           <el-select
               v-model="formData.type"
               placeholder="选择5G或4G"
               style="width: 300px"
               v-if="onSelect.is_type == 1"
           >
             <el-option
                 v-for="item in typeData"
                 :key="item"
                 :label="item"
                 :value="item"
             />
           </el-select>
           <el-input v-model="formData.type" v-else placeholder="填写5G或4G" style="width: 60%"></el-input>
         </el-form-item>
         <el-form-item label="颜色" prop="color" v-if="formData.spec_menu ==0">
           <el-input v-model="formData.color" placeholder="填写颜色"></el-input>
         </el-form-item>
         <el-form-item label="重量" prop="weight" v-if="formData.spec_menu ==0">
           <el-input v-model="formData.weight" placeholder="填写重量"></el-input>
         </el-form-item>
         <el-form-item label="发布日期" prop="launchDate" v-if="formData.spec_menu ==0">
           <el-input v-model="formData.launchDate" placeholder="填写发布日期"></el-input>
         </el-form-item>
         <el-form-item label="排序">
           <el-input-number v-model="formData.ranking"/>
         </el-form-item>
         <el-form-item label="显示/隐藏">
           <el-switch
               active-text="显示"
               inactive-text="隐藏"
              :active-value="1"
              :inactive-value="0"
               v-model="formData.status"
           >
           </el-switch>
         </el-form-item>
       </el-form>
  </Drawer>
</template>

<style scoped lang="scss">
  .bottomPage{
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>