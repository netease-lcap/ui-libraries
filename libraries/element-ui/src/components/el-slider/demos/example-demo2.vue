<!-- 离散值 -->
<!--  选项可以是离散的 -->
<template>
  <div>
    <div class="block">
      <span class="demonstration">不显示间断点</span>
      <el-slider v-model="value1" :step="10"> </el-slider>
    </div>
    <div class="block">
      <span class="demonstration">显示间断点</span>
      <el-slider v-model="value2" :step="10" show-stops> </el-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
    };
  },
};
</script>
