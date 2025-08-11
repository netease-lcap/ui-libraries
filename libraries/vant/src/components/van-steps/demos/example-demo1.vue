<template>
  <div>
    <van-steps :active="active">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <button @click="handleNext">Next step</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);

const handleNext = () => {
  active.value += 1;
  if (active.value > 3) {
    active.value = 0;
  }
};
</script>
