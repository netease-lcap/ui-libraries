<template>
  <el-carousel :dataSource="data" height="200px">
    <template #content="current">
      {{ current.item.content }}
    </template>
  </el-carousel>
</template>

<script lang="ts" setup>
const data = [
  {
    name: '1',
    label: 'label1',
    content: 'content1',
  },
  {
    name: '2',
    label: 'label2',
    content: 'content2',
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
