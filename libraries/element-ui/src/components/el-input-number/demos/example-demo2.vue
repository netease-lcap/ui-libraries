<!-- 禁用状态 -->
<!--  -->
<template>
  <div>
    <el-input-number v-model="num" :disabled="true"></el-input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
    };
  },
};
</script>
