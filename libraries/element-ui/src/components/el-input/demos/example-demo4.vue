<!-- 密码框 -->
<!--  -->
<template>
  <div>
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
    };
  },
};
</script>
