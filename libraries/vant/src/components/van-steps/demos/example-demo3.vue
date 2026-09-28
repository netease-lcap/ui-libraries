<template>
  <div>
    <van-steps direction="vertical" :active="active">
      <van-step activeIcon="star-o" inactiveIcon="chat-o" finishIcon="fire-o">
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
    <button @click="handlePrev">Prev step</button>
    <button @click="handleNext">Next step</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(-1);

const handlePrev = () => {
  active.value -= 1;
  if (active.value < 0) {
    active.value = 2;
  }
};

const handleNext = () => {
  active.value += 1;
  if (active.value > 2) {
    active.value = 0;
  }
};
</script>