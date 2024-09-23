<!-- 禁用状态 -->
<!--  -->
<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" :disabled="true">
    </el-input>
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
