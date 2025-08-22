<template>
  <div> 
    <van-cell is-link title="选项状态" @click="show = true" />
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
const actions = ref([
  { name: '选项1', color: '#07c160' },
  { name: '选项2', disabled: true },
  { name: '选项3', loading: true },
]);
</script>
