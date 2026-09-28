<template>
<van-skeleton title avatar :row="3" :loading="loading">
  <template #content>
    <div>实际内容</div>
  </template>
</van-skeleton>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 2000);
</script>