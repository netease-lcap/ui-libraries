<!-- 选择透明度 -->
<!--  -->
<template>
  <div><el-color-picker v-model="color" show-alpha></el-color-picker></div>
</template>
<script>
export default {
  data() {
    return {
      color: 'rgba(19, 206, 102, 0.8)',
    };
  },
};
</script>
