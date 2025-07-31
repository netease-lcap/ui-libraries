<template>
<van-signature background-color="#eee" @submit="onSubmit" @clear="onClear" />
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const onSubmit = (data: any) => {
  console.log('onSubmit', data);
};

const onClear = () => {
  console.log('onClear');
  showToast('clear')
};
</script>