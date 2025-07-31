<template>
  <van-swipe class="my-swipe-1" :autoplay="3000" vertical>
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe>
</template>
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