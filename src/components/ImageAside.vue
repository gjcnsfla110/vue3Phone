<script setup>
  defineOptions({
    name: 'ImageAside',
  })
  import Drawer from "@/components/Drawer.vue";
  import {ref, reactive} from "vue";
  import {imageClassList, updateImageClass,deleteImageClass} from "@/api/imageClass.js";
  import {showMsg} from "@/composables/utill.js";

  defineProps({
    height:{
      type: Number,
    }
  })
  //emit 관련변수
  const emit = defineEmits(["classActive"]);

  //메뉴 수정부분draw ref
  const editRef = ref(null);
  //페이징에 관련 변수
  const currentPage = ref(1);
  const totalPage = ref(0);
  const limitPage = ref(10);
  //imageClass변수
  const classList = ref([]);
  //데이터로딩효과부분
  const loding = ref(false);

  //페이지 change 이벤트
  const pageChange = (p)=>{
     currentPage.value = p;
     getData();
  }

  //사진메뉴클릭시 발생하는 이벤트
  function menuClickEv(a){
    emit("classActive",a);
  }

  //데이터를 갖고오는 부분
  const getData =async (page = null)=>{
      if(typeof page == 'number'){
         currentPage.value = page;
      }
      try {
         let data = await imageClassList(currentPage.value);
          classList.value = data.list;  // slice() 사용
          totalPage.value = data.total;
          /*if(classList.value[0]['child'][0]['child'] && classList.value[0]['child'][0]['child'].length>0) {
            defaultActiveClass.value = classList.value[0]['child'][0]['child'][0]['id'];
          }else if(classList.value[0] && classList.value[0]['child'].length>0){
            defaultActiveClass.value = classList.value[0]['child'][0]['id'];
          }else{
            defaultActiveClass.value = classList.value[0]['id'];
          }*/
      }catch(e){

      }
  }
  getData();

  //검증부분
  const rules = reactive({
    name : [
      {
        required: true,
        message : "填写分类名字",
        trigger: 'blur'
      }
    ],
    order : [
      {
        required: true,
        message : "用数字填写优选级",
        trigger: 'change'
      }
    ]
  });
  const editFormData = reactive({
      id:0,
      name : "",
      order : 50
  })

  //클래스 수정부분
  const drawer = ref(null);
  const editMenu = (item)=>{
      editFormData.id = item.id;
      editFormData.name=item.name;
      editFormData.order=item.order;
      drawer.value.openDrawer();
  }

  const editSubmit = ()=>{
    editRef.value.validate(valid => {
      if (!valid) return;
      if(!editFormData.id){
        showMsg("非法修改！联系客服","error");
      }
      updateImageClass(editFormData).then(res=>{
           loding.value= true;
           showMsg("菜单修改成功");
           drawer.value.closeDrawer();
           getData(currentPage.value);
      }).finally(()=>{
           loding.value = false;
      })
    })
  }

  //클래스 삭제부분
  const deleteMenu = (id)=>{
      deleteImageClass(id).then(res=>{
        loding.value = true;
         showMsg("删除成功");
         getData();
      }).finally(()=>{
        loding.value = false;
      })
  }

  defineExpose({
    getData
  })


</script>

<template>
  <el-aside v-loading="loding" class="menu_box" :style="{height:height+'px'}">
    <el-menu
        unique-opened
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="menu_top"
        :style="{height:(height-60)+'px'}"
        @select="menuClickEv"
    >
        <div v-for="menu in classList">
          <el-sub-menu v-if="menu.child.length > 0" :index="String(menu.id)">
            <template #title>
              <div class="menubar_item">
                <p>
                  <span>{{menu.name}}</span>
                </p>
                <div class="menubar_item_button">
                    <el-button @click.stop="editMenu(menu)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                    <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu.id)">
                      <template #reference>
                        <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                      </template>
                    </el-popconfirm>
                </div>
              </div>
            </template>
            <template v-for="menu1 in menu.child">
              <el-sub-menu v-if="menu1.child.length > 0" :index="String(menu1.id)" >
                <template #title>
                  <div class="menubar_item">
                    <p>
                      <span>{{menu1.name}}</span>
                    </p>
                    <div class="menubar_item_button">
                      <el-button @click.stop="editMenu(menu1)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                      <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu1.id)">
                        <template #reference>
                          <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div>
                </template>
                <template v-for="menu2 in menu1.child">
                  <el-sub-menu v-if="menu2.child.length > 0" :index="String(menu2.id)">
                    <template slot="title">
                      <div class="menubar_item">
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                        <div class="menubar_item_button">
                          <el-button @click.stop="editMenu(menu2)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                          <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu2.id)">
                            <template #reference>
                              <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                            </template>
                          </el-popconfirm>
                        </div>
                      </div>
                    </template>
                  </el-sub-menu>
                  <el-menu-item v-else  :index="String(menu2.id)" >
                    <template #title>
                      <div class="menubar_item">
                        <p>
                          <span>{{menu2.name}}</span>
                        </p>
                        <div class="menubar_item_button">
                          <el-button @click.stop="editMenu(menu2)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                          <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu2.id)">
                            <template #reference>
                              <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                            </template>
                          </el-popconfirm>
                        </div>
                      </div>
                    </template>
                  </el-menu-item>
                </template>
              </el-sub-menu>
              <el-menu-item v-else :index="String(menu1.id)">
                <template #title>
                  <div class="menubar_item">
                    <p>
                      <span>{{menu1.name}}</span>
                    </p>
                    <div class="menubar_item_button">
                      <el-button @click.stop="editMenu(menu1)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                      <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu1.id)">
                        <template #reference>
                          <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                  </div>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <el-menu-item v-else  :index="String(menu.id)">
            <template #title>
              <div class="menubar_item">
                <p>
                  <span>{{menu.name}}</span>
                </p>
                <div class="menubar_item_button">
                  <el-button @click.stop="editMenu(menu)"  style="display: block"  size="small"  type="primary"><el-icon :size="12"><Edit  color="rgb(255,255,255)"/></el-icon></el-button>
                  <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm="deleteMenu(menu.id)">
                    <template #reference>
                      <el-button @click.stop  style="display: block"  size="small"  type="danger"><el-icon :size="12"><Delete  color="rgb(255,255,255)"/></el-icon></el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
            </template>
          </el-menu-item>
        </div>
    </el-menu>
    <div class="menu_bottom">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="limitPage"
            background
            layout="prev, next"
            :total="totalPage"
            @change="pageChange"
            />
    </div>
    <Drawer ref="drawer" title="图片分类 修改" @submit="editSubmit()">
        <el-form
            ref="editRef"
            :model="editFormData"
            :rules = "rules"
            label-width="auto"
        >
          <el-form-item prop="name" label="填写分类">
            <el-input v-model="editFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="分类优先级" prop="order">
            <el-input-number v-model="editFormData.order"></el-input-number>
          </el-form-item>
        </el-form>
    </Drawer>
  </el-aside>
</template>

<style scoped lang="scss">
.menu_box{
  position: relative;
  .menu_top{
   position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow-y: auto;
    .menubar_item{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .menubar_item_button{
          display: flex;
          justify-items: center;
          align-items: center;
        .my_button:hover{
          color: blue;
          background-color: white;
        }
      }
    }
  }
  .menu_bottom{
    height: 60px;
    position: absolute;
    background-color:#545c64;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>