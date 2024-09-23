<!-- 基础用法 -->
<!--  由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。 -->
<template>
  <div>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '1',
    };
  },
};
</script>
