<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" style="min-height: 100vh;">
    <p>刷新次数: {{ count }}</p>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);

function onRefresh() {
  setTimeout(() => {
    count.value++;
    loading.value = false;
  }, 1000);
}

const loading = ref(false);

</script>