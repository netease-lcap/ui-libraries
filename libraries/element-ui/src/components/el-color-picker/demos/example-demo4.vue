<!-- 不同尺寸 -->
<!--  -->
<template>
  <div>
    <el-color-picker v-model="color"></el-color-picker>
    <el-color-picker v-model="color" size="medium"></el-color-picker>
    <el-color-picker v-model="color" size="small"></el-color-picker>
    <el-color-picker v-model="color" size="mini"></el-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color: '#409EFF',
    };
  },
};
</script>
