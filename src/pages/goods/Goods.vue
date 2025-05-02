<script setup>
    import SearchItem from "@/components/SearchItem.vue";

    defineOptions({
      name: 'Goods',
    })
    import Search from "@/components/Search.vue";
    import {useInitTable,useInitFrom} from "@/composables/useCommon.js";
    import Drawer from "@/components/Drawer.vue";
    import CheckImg from "@/components/CheckImg.vue";
    import {ref} from "vue";
    import {goodsList,createGoods,deleteGoods,deleteAll,updateGoods,updateStatus,updateStatusAll} from "@/api/goods/goods.js";
    import {listTrees,menuListTrees,orderTrees} from "@/composables/useCommon.js";
    import useSpecData from "@/store/spec.js";
    const {storageData} = useSpecData();
    const firstList = ref(1);
    //필요한데이터
    const deliverys = ref([]);
    const goodsCategorys = ref([]);
    const goodsColors = ref([]);
    const goodsSpecs = ref([]);
    const labels = ref([]);
    const models = ref([]);
    const services = ref([]);
    const tableList = ref([]);
    const {
      searchForm,
      resetSearchForm,
      loading,
      currentPage,
      total,
      limit,
      getData,
      handleStatusChange,
      handleDelete,
    } = useInitTable({
        defaultSearchForm:{
           title1:"",
           category_id:"",
           model:"",
           type:"",
           isCheck:1
        },
        afterDataList:(res)=>{
          tableList.value = res.list;
          if(firstList.value < 2){
            deliverys.value = res.delivery;
            services.value = res.service;
            goodsColors.value = res.goodsColor;
            labels.value = res.label;
            goodsSpecs.value = listTrees(res.goodsSpec,'spec_id','child',0,(item)=>{
              item.model = item.model ? item.model : item.name;
              return true;
            });
            models.value =listTrees(res.model,'pid','child',0,(item)=>{
              item.name = item.name ? item.name : item.menu;
              return true;
            });
            goodsCategorys.value = listTrees(res.goodsCategory,'category_id');
          }
          searchForm.isCheck= firstList.value+1;
          firstList.value = firstList.value+1;
        },
        getList:goodsList,
    });
    const{
      formDrawerRef,
      formRef,
      formData,
      formRules,
      formTitle,
      handleCreate,
      handleUpdate,
      resetFormData,
      handleSubmit
    } = useInitFrom({
        form:{
          category_id:"",
          model:"",
          service:[],
          label:"",
          type:1,
          title:"",
          title1:"",
          img:"",
          banner:[],
          content:"",
          price:"",
          price1:"",
          price2:"",
          price3:"",
          color:"",
          storage:"",
          status:1,
          delivery:[],
          order:50,
          spec_id:"",
          phone_detail:"",
          isShop:1,
        },
        rules:{
          category_id:{
            required: true,
            message:"选择商品分类",
            trigger:"change"
          },
          model:{
            required: true,
            message:'选择商品型号',
            trigger:"change"
          },
          type:{
            required: true,
            message:'选择商品类型',
            trigger:"change"
          },
          title1:{
            required: true,
            message:"填写详细商品名称",
            trigger:"blur"
          },
        },
       create:createGoods,
       update:updateGoods,
       getDataList:getData,
    });
    getData();
    //모델타입
    const modelTypeOption = [
      {label:'全部',value:""},
      {label:'新手机',value:1},
      {label:'开封商品',value:2},
      {label:'二手机',value:3}
    ]
    //입력,선택여부 결정
    const isColor = ref(1);
    const isStorage = ref(1);

</script>
<template>
    <el-card>
       <div style="margin-bottom: 15px">
          <el-button type="primary" size="large" @click="handleCreate">添加商品</el-button>
       </div>
       <Search backColor="rgb(248,248,248)" @search="getData" :model="searchForm" @reset="resetSearchForm">
          <search-item label="商品标题">
              <el-input v-model="searchForm.title1" placeholder="填写详细标题"></el-input>
          </search-item>
          <template #show>
            <SearchItem label="商品分类">
              <el-cascader
                  v-model="searchForm.category_id"
                  :options="goodsCategorys"
                  :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                  placeholder="请选择商品分类"
                  style="width: 330px"
              />
            </SearchItem>
            <SearchItem label="商品名称">
              <el-cascader
                  v-model="searchForm.model"
                  :options="models"
                  :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                  placeholder="请选择商品"
                  style="width: 330px"
              />
            </SearchItem>
            <SearchItem label="商品类型">
              <el-select v-model="searchForm.type" placeholder="选择商品类型" style="width: 330px">
                <el-option
                    v-for="item in modelTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </SearchItem>
          </template>
       </Search>
       <div class="headerMenu">
          <el-button plain>全部商品</el-button>
          <el-button type="primary" plain round>出售商品</el-button>
          <el-button type="info" plain round>暂售商品</el-button>
          <el-button type="danger">批量删除</el-button>
          <el-button type="primary">批量上架</el-button>
          <el-button type="info">批量下架</el-button>
       </div>
       <el-table
           :data="tableList"
           v-loading="loading"
       >
          <el-table-column></el-table-column>
       </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" v-model:page-size="limit" v-model:current-page="currentPage" :total="total" />
      </div>
    </el-card>
    <Drawer ref="formDrawerRef" :title="formTitle" @submit="handleSubmit">
        <el-form
        :model="formData"
        :rules="formRules"
        label-width="auto"
        ref="formRef"
        >
           <el-form-item label="商品分类" prop="category_id">
             <el-cascader
                 v-model="formData.category_id"
                 :options="goodsCategorys"
                 :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                 placeholder="请选择商品分类"
                 style="width: 300px"
             />
           </el-form-item>
          <el-form-item label="商品" prop="model">
            <el-cascader
                v-model="formData.model"
                :options="models"
                :props="{value:'id',label:'name',children:'child',checkStrictly:true,emitPath:false }"
                placeholder="请选择商品"
                style="width: 300px"
            />
          </el-form-item>
          <el-form-item label="服务">
            <el-checkbox-group v-model="formData.service">
              <el-checkbox v-for="item in services" :key="item.id" :value="{title:item.title,description:item.description}" :label="item.title" border ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="购买方式">
            <el-checkbox-group v-model="formData.delivery">
              <el-checkbox v-for="item in deliverys" :key="item.id" :value="{title:item.title,description:item.description}" :label="item.title" border ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
                v-model="formData.label"
                clearable
                placeholder="请选择标签"
                style="width: 300px"
            >
              <el-option
                  v-for="item in labels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="商品类型" prop="type">
            <el-radio-group v-model="formData.type" size="large">
              <el-radio-button label="新商品" :value="1" />
              <el-radio-button label="开封商品" :value="2" />
              <el-radio-button label="二手商品" :value="3" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品详细">
              <el-input v-model="formData.title" placeholder="请填写标题详细" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="详细标题" prop="title1">
               <el-input v-model="formData.title1" placeholder="请填写详细标题" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="详细URL">
            <el-input v-model="formData.content" placeholder="请填写详细信息URL" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="主图">
             <CheckImg v-model="formData.img"></CheckImg>
          </el-form-item>
          <el-form-item label="轮播详细图">
             <CheckImg v-model="formData.banner" :limit="20" ></CheckImg>
          </el-form-item>
          <el-form-item label="市场原价">
            <el-input v-model="formData.price3" placeholder="填写市场原价" style="width: 80%" :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.type != 3" label="合约机价格">
              <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.price" placeholder="填写合约机新机价格" style="width: 80%" ></el-input>
          </el-form-item>
          <el-form-item v-if="formData.type != 3" label="专卖店价格">
            <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.price1" placeholder="填写专柜新价格" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item v-if="formData.type == 3" label="二手价格">
            <el-input :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')" v-model="formData.price2" placeholder="填写二手价格" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="选择参数" v-if="formData.type != 3">
            <el-cascader
                v-model="formData.spec_id"
                :options="goodsSpecs"
                :props="{value:'id',label:'model',children:'child',checkStrictly:true,emitPath:false }"
                placeholder="请选择参数"
                style="width: 300px"
            />
          </el-form-item>
          <el-form-item label="颜色">
            <el-radio-group v-model="isColor" size="large">
              <el-radio-button label="选项" :value="1" />
              <el-radio-button label="填写" :value="2" />
            </el-radio-group>
            <el-select
                v-if="isColor == 1"
                v-model="formData.color"
                clearable
                placeholder="请选择颜色"
                style="width: 300px;margin-left: 15px"
            >
              <el-option
                  v-for="item in goodsColors"
                  :key="item.id"
                  :label="item.color"
                  :value="JSON.stringify({color:item.color,english:item.english,code:item.code})"
              />
            </el-select>
            <el-input v-else v-model="formData.color" placeholder="填写颜色" style="width: 300px;margin-left: 15px"> </el-input>
          </el-form-item>
          <el-form-item label="内存">
            <el-radio-group v-model="isStorage" size="large">
              <el-radio-button label="选项" :value="1" />
              <el-radio-button label="填写" :value="2" />
            </el-radio-group>
            <el-select
                v-if="isStorage == 1"
                v-model="formData.storage"
                clearable
                placeholder="请选择内存"
                style="width: 300px;margin-left: 15px"
            >
              <el-option
                  v-for="item in storageData"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
            <el-input v-else v-model="formData.storage" placeholder="填写内存" style="width: 300px; margin-left:15px;"> </el-input>
          </el-form-item>
          <el-form-item label="二手说明" v-if="formData.type == 3">
            <el-input
                v-model="formData.phone_detail"
                maxlength="500"
                :rows="6"
                style="width: 500px"
                placeholder="填写二手手机详细说明"
                show-word-limit
                type="textarea"
            />
          </el-form-item>
          <el-form-item label="商品所属" v-if="formData.type == 3">
            <el-radio-group v-model="formData.isShop" size="large">
              <el-radio-button label="公司所属" :value="1" />
              <el-radio-button label="卖家寄托" :value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="formData.status" active-text="正常" inactive-text="隐藏"  :active-value="1" :inactive-value="0"/>
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="formData.order"/>
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
.headerMenu{
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>