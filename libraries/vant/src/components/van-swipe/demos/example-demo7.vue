<template>
  <van-swipe class="my-swipe-1" :autoplay="3000" :dataSource="dataSource" :isIndicator="true">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
    <template #content="{ item }">
      <van-image :src="item.url" :alt="item.alt" />
    </template>
    <template #indicator="{ active, total }">
      <div style="background-color: red; width: 50px; height: 20px; position: absolute; bottom: 0; left: 0;">{{ active + 1 }}/{{ total }}</div>
    </template>
  </van-swipe>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dataSource = ref([
  // {}
  {
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    alt: '1',
  },
  {
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    alt111: '2',
  },
]);
</script>