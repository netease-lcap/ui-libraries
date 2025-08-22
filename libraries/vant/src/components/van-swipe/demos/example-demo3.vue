<template>
  <van-swipe class="my-swipe-1" @change="onChange" :autoplay="3000">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const onChange = (index: number) => {
  showToast('当前 Swipe 索引：' + index);
};
</script>
<style>
.my-swipe-1 {
  height: 150px;
}
.my-swipe-1 .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>