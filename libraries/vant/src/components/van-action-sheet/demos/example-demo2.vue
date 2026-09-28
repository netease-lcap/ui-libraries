<template>
  <div>
    <van-cell is-link title="展示图标" @click="show = true" />
    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(false);
const actions = ref([
  { name: '选项1', color: '#07c160', icon: 'cart-o' },
  { name: '选项2', color: '#07c160', icon: 'shop-o' },
  { name: '选项3', color: '#07c160', icon: 'star-o' },
]);

const onSelect = (item) => {
  show.value = false;
  showToast(item.name);
};
</script>
