<template>
  <div>
    <van-steps :active="active" active-icon="success" active-color="#07c160">
      <van-step>买家下单</van-step>
      <van-step>商家接单</van-step>
      <van-step>买家提货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>
    <button @click="handlePrev">Prev step</button>
    <button @click="handleNext">Next step</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const active = ref(1);

const handlePrev = () => {
  active.value -= 1;
  if (active.value < 0) {
    active.value = 3;
  }
};

const handleNext = () => {
  active.value += 1;
  if (active.value > 3) {
    active.value = 0;
  }
};
</script>