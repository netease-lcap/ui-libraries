<!-- 基本用法 -->
<!--  -->
<template>
  <div>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
