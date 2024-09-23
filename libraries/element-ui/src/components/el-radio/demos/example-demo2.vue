<!-- 禁用状态 -->
<!--  单选框不可用的状态。 -->
<template>
  <div>
    <el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
    <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: '选中且禁用',
    };
  },
};
</script>
