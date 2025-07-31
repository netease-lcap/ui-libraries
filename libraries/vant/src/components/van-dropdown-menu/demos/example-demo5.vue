<template>
  <div style="margin-top: 300px;">
    <van-dropdown-menu direction="up">
      <van-dropdown-item v-model="value1" :dataSource="option1" />
      <van-dropdown-item v-model="value2" :dataSource="option2" />
    </van-dropdown-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('11');
const value2 = ref('22');

const option1 = ref([{ text: '选项1', value: '11' }, { text: '选项2', value: '12' }, { text: '选项3', value: '13' }]);
const option2 = ref([{ text: '选项1', value: '21' }, { text: '选项2', value: '22' }, { text: '选项3', value: '23' }]);
</script>