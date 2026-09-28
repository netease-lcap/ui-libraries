<template>
  <div>
    <van-cell title="成功提示" @click="handleOpen1" />
    <van-cell title="打开弹窗" @click="handleOpen2" />
    <van-toast v-model:show="show1" type="success" />
    <van-toast v-model:show="show2" type="fail" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show1 = ref(false);
const show2 = ref(false);

const handleOpen1 = () => {
  show1.value = true;
};

const handleOpen2 = () => {
  show2.value = true;
};

</script>