<!-- 可自适应文本高度的文本域 -->
<!--  通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。 -->
<template>
  <div>
    <el-input
      type="textarea"
      autosize
      placeholder="请输入内容"
      v-model="textarea1">
    </el-input>
    <div style="margin: 20px 0"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      placeholder="请输入内容"
      v-model="textarea2">
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: '',
    };
  },
};
</script>
