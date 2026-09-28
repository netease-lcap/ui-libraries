<template>
  <div style="margin-top: 140px; margin-left: 140px;">
    <van-popover-combination :actions="actions" placement="top">
      <template #reference>
        <van-button type="primary">顶部弹出</van-button>
      </template>
    </van-popover-combination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const actions = ref([
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' },
]);
</script>