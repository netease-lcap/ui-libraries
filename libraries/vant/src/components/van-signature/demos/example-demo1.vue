<template>
  <div>
    <van-signature @submit="onSubmit" @clear="onClear" />
    <img v-if="image" :src="image" alt="signature" />
  </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const image = ref('');

const onSubmit = (data: any) => {
  image.value = data.image;
};

const onClear = () => {
  showToast('clear')
};
</script>