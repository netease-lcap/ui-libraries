<!-- 单选框组 -->
<!--  适用于在多个互斥的选项中选择的场景 -->
<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 3,
    };
  },
};
</script>
