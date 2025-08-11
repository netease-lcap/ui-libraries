<template>
  <div>
    <van-cell title="主要通知" @click="showNotify1" />
    <van-cell title="成功通知" @click="showNotify2" />
    <van-cell title="危险通知" @click="showNotify3" />
    <van-cell title="警告通知" @click="showNotify4" />

    <van-notify ref="notifyRef" type="primary" v-model:show="show1">
      <span>通知内容</span>
    </van-notify>

    <van-notify ref="notifyRef" type="success" v-model:show="show2">
      <span>通知内容</span>
    </van-notify>

    <van-notify ref="notifyRef" type="danger" v-model:show="show3">
      <span>通知内容</span>
    </van-notify>

    <van-notify ref="notifyRef" type="warning" v-model:show="show4">
      <span>通知内容</span>
    </van-notify>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);

const showNotify1 = () => {
  show1.value = true;
  setTimeout(() => {
    show1.value = false;
  }, 2000);
};

const showNotify2 = () => {
  show2.value = true;
  setTimeout(() => {
    show2.value = false;
  }, 2000);
};

const showNotify3 = () => {
  show3.value = true;
  setTimeout(() => {
    show3.value = false;
  }, 2000);
};

const showNotify4 = () => {
  show4.value = true;
  setTimeout(() => {
    show4.value = false;
  }, 2000);
};

</script>