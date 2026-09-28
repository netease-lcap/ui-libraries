<template>
  <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh" style="min-height: 100vh;">
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling="props">
      <img class="doge" src="https://fastly.jsdelivr.net/npm/@vant/assets/doge.png"
        :style="{ transform: `scale(${props.distance / 80})` }" />
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <img class="doge" src="https://fastly.jsdelivr.net/npm/@vant/assets/doge.png" />
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <img class="doge" src="https://fastly.jsdelivr.net/npm/@vant/assets/doge-fire.jpeg" />
    </template>
    <p>刷新次数: {{ count }}</p>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

function onRefresh() {
  setTimeout(() => {
    count.value++;
    isLoading.value = false;
  }, 1000);
}

const isLoading = ref(false);

</script>

<style>
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>