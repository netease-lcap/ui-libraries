<template>
  <el-carousel arrow="always" :dataSource="data" height="200px">
    <template #content="current">
      {{ current.content }}
    </template>
  </el-carousel>
</template>

<script lang="ts" setup>
const data = [
  {
    name: '1',
    label: '{{ item.label }}',
    content: '{{ item.content }}',
  },
  {
    name: '2',
    label: '{{ item.label }}',
    content: '{{ item.content }}',
  },
  {
    name: '3',
    label: '{{ item.label }}',
    content: '{{ item.content }}',
  },
];
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
