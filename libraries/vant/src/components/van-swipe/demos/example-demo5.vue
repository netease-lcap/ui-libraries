<template>
  <van-swipe :loop="false" :width="300" :autoplay="3000" class="my-swipe-1">
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" width="100%" height="100%" />
    </van-swipe-item>
  </van-swipe>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const images = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',

]);
</script>
<style>
.my-swipe-1 {
  height: 150px;
}

.my-swipe-1 .van-swipe-item {
  color: #fff;
  font-size: 20px;
  background-color: #39a9ed;
}
</style>