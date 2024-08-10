<!-- 严格步数 -->
<!--  -->
<template>
  <div>
    <el-input-number v-model="num" :step="2" step-strictly></el-input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 2,
    };
  },
};
</script>
