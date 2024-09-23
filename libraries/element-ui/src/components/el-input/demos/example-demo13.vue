<!-- 输入长度限制 -->
<!--  -->
<template>
  <div>
    <el-input
      type="text"
      placeholder="请输入内容"
      v-model="text"
      maxlength="10"
      show-word-limit>
    </el-input>
    <div style="margin: 20px 0"></div>
    <el-input
      type="textarea"
      placeholder="请输入内容"
      v-model="textarea"
      maxlength="30"
      show-word-limit>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      textarea: '',
    };
  },
};
</script>
