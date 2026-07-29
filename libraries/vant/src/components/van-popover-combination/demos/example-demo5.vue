<template>
  <div style="margin-top: 140px; margin-left: 140px;">
    <van-popover-combination :actions="actions">
      <template #reference>
        <van-button type="primary">展示图标</van-button>
      </template>
    </van-popover-combination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const actions = ref([
  { text: '选项一', icon: 'add-o' },
  { text: '选项二', icon: 'music-o' },
  { text: '选项三', icon: 'more-o' },

]);
</script>