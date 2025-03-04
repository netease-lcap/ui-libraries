<!-- 基础用法 -->
<!--  简单的步骤条。 -->
<template>
  <div>
    <el-steps ref="steps" :active="active" finish-status="success">
      <el-step name="age1" title="步骤 1"></el-step>
      <el-step name="age2" title="步骤 2"></el-step>
      <el-step name="age3" title="步骤 3"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'age1',
    };
  },

  methods: {
    next() {
      this.$refs.steps.next();
    },
  },
};
</script>
