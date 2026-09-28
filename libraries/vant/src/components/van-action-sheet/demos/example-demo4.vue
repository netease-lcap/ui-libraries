<template>
  <div> 
    <van-cell is-link title="展示描述信息" @click="show = true" />
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" description="这是一段描述信息"
      close-on-click-action />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const show = ref(false);
const actions = ref([
  { name: '选项1' },
  { name: '选项2' },
  { name: '选项3' },
]);
</script>