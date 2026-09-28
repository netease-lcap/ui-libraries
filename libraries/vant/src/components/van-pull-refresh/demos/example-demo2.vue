<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" style="min-height: 100vh;">
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