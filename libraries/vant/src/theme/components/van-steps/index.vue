<template>
  <div>
    <van-steps :active="active" direction="horizontal">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>

    <van-steps :active="active" direction="vertical" style="margin-top: 10px;">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);

</script>
