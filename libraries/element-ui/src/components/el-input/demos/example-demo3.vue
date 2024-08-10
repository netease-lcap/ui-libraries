<!-- 可清空 -->
<!--  -->
<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
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
