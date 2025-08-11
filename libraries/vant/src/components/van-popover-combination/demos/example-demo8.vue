<template>
  <van-popover-combination @select="onSelect" :actions="actions">
    <template #reference>
      <van-cell title="非受控模式" />
    </template>
    <template #action="{ action, index }">
      <div>{{ action.text }}---{{ index }}</div>
    </template>
  </van-popover-combination>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const actions = [
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' },
];

const onSelect = (action) => showToast(action.text);

</script>