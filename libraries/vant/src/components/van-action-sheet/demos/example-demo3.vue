<template>
  <div>
    <van-cell is-link title="展示取消按钮" @click="show = true" />
    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action
      @cancel="onCancel" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const show = ref(false);
const actions = ref([
  { name: '选项1' },
  { name: '选项2' },
  { name: '选项3' },
]);

const onCancel = () => {
  show.value = false;
  showToast('取消');
};
</script>
