<script setup>
import { ref,defineEmits } from 'vue'
const emit = defineEmits(['changeCName']);
const selectedValue = ref('ItemTitle') // 초기값
const clickSelectedValue = (componentName)=>{
    selectedValue.value = componentName;
    emit('changeCName',componentName);
}
</script>

<template>
  <div class="card-group">

    <!--ItemTitle--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemTitle' }"
        @click="clickSelectedValue('ItemTitle')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemTitle</h3>
          </div>
        </template>

        <div class="card-body">
           <div class="ItemTitle">
              <div class="ItemTitleLeft">오른쪽큰제목</div>
              <div class="ItemTitleRight">왼쪽작은제목</div>
           </div>
        </div>
      </el-card>
    </div>

    <!--ItemContentList--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemContentList' }"
        @click="clickSelectedValue('ItemContentList')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemContentList</h3>
          </div>
        </template>


      </el-card>
    </div>

    <!--ItemContentOne--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemContentOne' }"
        @click="clickSelectedValue('ItemContentOne')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemContentOne</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ItemContentTitle--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemContentTitle' }"
        @click="clickSelectedValue('ItemContentTitle')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemContentTitle</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ItemContentTwo--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemContentTwo' }"
        @click="clickSelectedValue('ItemContentTwo')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemContentTwo</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ItemList--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemList' }"
        @click="clickSelectedValue('ItemList')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemList</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ItemNew--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemNew' }"
        @click="clickSelectedValue('ItemNew')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemNew</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ItemScrollView--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ItemScrollView' }"
        @click="clickSelectedValue('ItemScrollView')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ItemScrollView</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--ImgBanner--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'ImgBanner' }"
        @click="clickSelectedValue('ImgBanner')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>ImgBanner</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--SwiperBanner--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'SwiperBanner' }"
        @click="clickSelectedValue('SwiperBanner')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>SwiperBanner</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--SwiperImg--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'SwiperImg' }"
        @click="clickSelectedValue('SwiperImg')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>SwiperImg</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

    <!--OneImg--->
    <div
        class="selectable-card"
        :class="{ 'is-selected': selectedValue === 'OneImg' }"
        @click="clickSelectedValue('OneImg')"
    >
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <h3>OneImg</h3>
          </div>
        </template>

        <div class="card-body">
          <p>추가로 원하는 내용, 가격, 기능 목록 등 자유롭게 넣으세요.</p>
          <ul>
            <li>기능 1</li>
            <li>기능 2</li>
            <li>기능 3</li>
          </ul>
        </div>
      </el-card>
    </div>

  </div>
</template>

<style scoped lang="scss">
/*---------------- 아이템 타이틀 ItemTitle -----------------------*/
.ItemTitle{
  width: 500px;
  display: flex;
  height: 80px;
  line-height: 80px;
  border: 1px solid rgb(240,240,240);
  padding: 0 20px;
  .ItemTitleLeft{
      width: 300px;
      font-size: 30px;
  }

  .ItemTitleRight{
      width: 300px;
      font-size: 20px;
      text-align: right;
      color: rgb(200,200,200);
  }
}

/*---------------- ItemContentList css -----------------------*/





/*------------- 총 아이템 css ---------------*/
.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  padding: 0 10px;
}

.selectable-card {
  cursor: pointer;
  width: 600px;
  margin: 0 auto;
  transition: transform 0.2s;
}

.selectable-card:hover {
  transform: translateY(-4px);
}

.selectable-card .el-card {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  box-sizing: border-box;
}

/* 카드 내용이 확실히 보이게 */
.card-body {
  padding: 16px;
  line-height: 1.6;
  color: #333;
}

.is-selected .el-card {
  border: 3px solid #409eff !important;
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.5);
}

</style>