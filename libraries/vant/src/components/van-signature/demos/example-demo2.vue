<template>
<van-signature pen-color="red" @submit="onSubmit" @clear="onClear" tips="请在下方签名" @start="onStart" @end="onEnd" @signing="onSigning" />
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

  const onStart = () => {
    console.log('onStart');
  };

  const onEnd = () => {
    console.log('onEnd');
  };

  const onSigning = (event: any) => {
    console.log('onSigning', event);
  };

</script>