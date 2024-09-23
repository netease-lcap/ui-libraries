<!-- 基础用法 -->
<!--  单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。 -->
<template>
  <div>
    <!-- `checked` 为 true 或 false -->
    <el-checkbox v-model="checked">备选项</el-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
</script>
