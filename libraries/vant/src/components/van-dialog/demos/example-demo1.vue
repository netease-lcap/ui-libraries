<template>
  <div>
    <van-cell title="打开弹窗" @click="handleOpen" />
    <van-dialog v-model:show="show" message="生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。" ref="dialogRef"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const dialogRef = ref();
const handleOpen = () => {
  // show.value = true;
  dialogRef.value.open();
};

</script>