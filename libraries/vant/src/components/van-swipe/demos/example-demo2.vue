<template>
<van-swipe class="my-swipe-1" :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in images" :key="image">
    <img :src="image" />
  </van-swipe-item>
</van-swipe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const images = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]);
</script>
<style>
.my-swipe-1 {
  height: 150px;
}
</style>