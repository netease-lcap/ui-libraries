<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-dialog v-model:show="show" title="标题" message="生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。" theme="round-button" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);

const handleOpen = () => {
  show.value = true;
};

</script>