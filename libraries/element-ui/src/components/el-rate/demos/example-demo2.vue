<!-- 辅助文字 -->
<!--  用辅助文字直接地表达对应分数 -->
<template>
  <div><el-rate v-model="value" show-text> </el-rate></div>
</template>
<script>
export default {
  data() {
    return {
      value: null,
    };
  },
};
</script>
