<template>
  <van-dropdown-menu swipe-threshold="4">
    <van-dropdown-item v-model="value1" :dataSource="option1" />
    <van-dropdown-item v-model="value2" :dataSource="option2" />
    <van-dropdown-item v-model="value3" :dataSource="option3" />
    <van-dropdown-item v-model="value4" :dataSource="option4" />
    <van-dropdown-item v-model="value5" :dataSource="option5" />
    <van-dropdown-item v-model="value6" :dataSource="option6" />
    <van-dropdown-item v-model="value7" :dataSource="option7" />
    <van-dropdown-item v-model="value8" :dataSource="option8" />
  </van-dropdown-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('11');
const value2 = ref('22');
const value3 = ref('33');
const value4 = ref('41');
const value5 = ref('51');
const value6 = ref('61');
const value7 = ref('71');
const value8 = ref('81');

const option1 = ref([{ text: '选项1', value: '11' }, { text: '选项2', value: '12' }, { text: '选项3', value: '13' }]);
const option2 = ref([{ text: '选项1', value: '21' }, { text: '选项2', value: '22' }, { text: '选项3', value: '23' }]);
const option3 = ref([{ text: '选项1', value: '31' }, { text: '选项2', value: '32' }, { text: '选项3', value: '33' }]);
const option4 = ref([{ text: '选项1', value: '41' }, { text: '选项2', value: '42' }, { text: '选项3', value: '43' }]);
const option5 = ref([{ text: '选项1', value: '51' }, { text: '选项2', value: '52' }, { text: '选项3', value: '53' }]);
const option6 = ref([{ text: '选项1', value: '61' }, { text: '选项2', value: '62' }, { text: '选项3', value: '63' }]);
const option7 = ref([{ text: '选项1', value: '71' }, { text: '选项2', value: '72' }, { text: '选项3', value: '73' }]);
const option8 = ref([{ text: '选项1', value: '81' }, { text: '选项2', value: '82' }, { text: '选项3', value: '83' }]);
</script>