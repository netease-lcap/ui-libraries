<!-- 基础 -->
<!--  -->
<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"> </el-page-header>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      console.log('go back');
    },
  },
};
</script>
