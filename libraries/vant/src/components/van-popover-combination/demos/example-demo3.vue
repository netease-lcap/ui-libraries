<template>
  <div style="margin-left: 140px;">
    <van-popover-combination :actions="actions" actions-direction="horizontal" @select="onSelect">
      <template #reference>
        <van-button type="primary">水平排列</van-button>
      </template>
    </van-popover-combination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const actions = ref([
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' },
]);

const onSelect = (action) => {
  showToast(action.text)
};
</script>