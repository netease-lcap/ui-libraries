<template>
  <van-popover-combination @select="onSelect" :dataSource="dataSource">
    <template #reference>
      <van-button text="使用数据源" />
    </template>
    <template #action="{ action, index }">
      <div>{{ action.text }}---{{ index }}</div>
    </template>
    <!-- <template #default>
      <div>123</div>
    </template> -->
  </van-popover-combination>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const dataSource = [
  { text: '选项一', color: 'red', icon: 'star-o' },
  { text: '选项二', color: 'blue', icon: 'cart-o' },
  { text: '选项三', color: 'green', icon: 'fire-o' },
];

const actions = [
  { "text": "选项一", "color": "black", "icon": "star-o", "disabled": false }
];

const onSelect = (action) => showToast(action.text);

</script>