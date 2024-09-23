<!-- 竖向模式 -->
<!--  -->
<template>
  <div>
    <div class="block">
      <el-slider v-model="value" vertical height="200px"> </el-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>
