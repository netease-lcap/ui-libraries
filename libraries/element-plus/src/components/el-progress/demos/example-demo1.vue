<!-- 线形进度条 -->
<!--  -->
<template>
  <div>
    <el-progress :percentage="50"></el-progress>
    <el-progress :percentage="100" :format="format"></el-progress>
    <el-progress :percentage="100" status="success"></el-progress>
    <el-progress :percentage="100" status="warning"></el-progress>
    <el-progress :percentage="50" status="exception"></el-progress>
  </div>
</template>
<script>
export default {
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
  },
};
</script>
