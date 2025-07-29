<template>
  <van-dropdown-menu ref="menuRef">
    <van-dropdown-item v-model="value" :dataSource="options" />
    <van-dropdown-item title="筛选" ref="itemRef" :isCustomContent="true">
      <van-cell center title="包邮">
        <template #right-icon>
          <van-switch v-model="switch1" />
        </template>
      </van-cell>
      <van-cell center title="团购">
        <template #right-icon>
          <van-switch v-model="switch2" />
        </template>
      </van-cell>
      <div style="padding: 5px 16px;">
        <van-button type="primary" block round @click="onConfirm">
          确认
        </van-button>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Switch as VanSwitch, Button as VanButton } from 'vant';

const menuRef = ref(null);
const itemRef = ref(null);
const value = ref(0);
const options = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 },
];
const switch1 = ref(false);
const switch2 = ref(false);

const onConfirm = () => {
  menuRef.value?.close?.();
  // itemRef.value?.toggle?.();
};
</script>