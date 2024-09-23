<!-- 禁用状态 -->
<!--  多选框不可用状态。 -->
<template>
  <div>
    <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
    <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true,
    };
  },
};
</script>
