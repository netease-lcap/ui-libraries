<!-- 基础用法 -->

<template>
  <van-steps>
  <van-step>买家下单</van-step>
  <van-step>商家接单</van-step>
  <van-step>买家提货</van-step>
  <van-step>交易完成</van-step>

  <template #item="current">
    <van-step 
      vusion-disabled-cut
      vusion-disabled-copy
    >步骤名</van-step>
  </template>
</van-steps>
</template>