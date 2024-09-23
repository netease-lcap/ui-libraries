<!-- 带有输入框 -->
<!--  通过输入框设置精确数值 -->
<template>
  <div>
    <div class="block">
      <el-slider v-model="value" show-input> </el-slider>
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
