<template>
  <van-dropdown-menu>
  <van-dropdown-item v-model="value1" :dataSource="dataSource">
  </van-dropdown-item>
  <van-dropdown-item v-model="value2">
  </van-dropdown-item>
</van-dropdown-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dataSource = ref([{
  text: '选项1',
  value: '1.1',
}, {
  text: '选项2',
  value: '2.1',
}, {
  text: '选项3',
  value: '3.1',
}]);

const value1 = ref('1.1');
const value2 = ref('2.1');
</script>