<template>
  <van-text-ellipsis :content="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。');
</script>