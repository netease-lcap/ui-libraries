<template>
  <el-carousel ref="carouselRef" :dataSource="data" height="200px" nameField="label">
    <template #content="current">
      {{ current.item.content }}
    </template>
  </el-carousel>
  <el-button @click="setActiveItem">设置激活</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const data = [{}
  // {
  //   name: '1',
  //   label: 'label1',
  //   content: 'content1',
  // },
  // {
  //   name: '2',
  //   label: 'label2',
  //   content: 'content2',
  // },
];

const carouselRef = ref();

const setActiveItem = () => {
  carouselRef.value.setActiveItem('label2');
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
