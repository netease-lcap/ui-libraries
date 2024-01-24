<!-- 带图片样式 -->

<template>
  <van-cardu title="卡片" coverSlot>
  <template #cover>
    <van-image :preview="false" src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"></van-image>
  </template>
  <template #head>
    <van-text text="标题"></van-text>
  </template>
  卡片内容
</van-cardu>
</template>