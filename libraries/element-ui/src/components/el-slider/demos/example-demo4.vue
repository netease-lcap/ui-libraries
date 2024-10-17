<!-- 范围选择 -->
<!--  支持选择某一数值范围 -->
<template>
  <div>
    <div class="block">
      <el-slider v-model="value" range show-stops :max="10"> </el-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [4, 8],
    };
  },
};
</script>
