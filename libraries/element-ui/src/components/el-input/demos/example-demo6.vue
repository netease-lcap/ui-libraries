<!-- 文本域 -->
<!--  用于输入多行文本信息，通过将 `type` 属性的值指定为 textarea。 -->
<template>
  <div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: '',
    };
  },
};
</script>
