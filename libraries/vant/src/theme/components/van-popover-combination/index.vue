<template>
  <van-row>
    <van-col span="8">
      <van-popover-combination v-model:show="showPopover1" :actions="actions" @select="onSelect">
        <template #reference>
          <van-button text="浅色风格" />
        </template>
      </van-popover-combination>
    </van-col>
    <van-col span="8">
      <van-popover-combination v-model:show="showPopover2" :actions="actions" @select="onSelect" theme="dark">
        <template #reference>
          <van-button text="深色风格" />
        </template>
      </van-popover-combination>
    </van-col>
    <van-col span="8">
      <van-popover-combination v-model:show="showPopover3" :actions="actions" @select="onSelect" actions-direction="horizontal" placement="bottom-end">
        <template #reference>
          <van-button text="水平排列" />
        </template>
      </van-popover-combination>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const showPopover1 = ref(false);
const showPopover2 = ref(false);
const showPopover3 = ref(false);
const actions = ref([
  { text: '选项一 禁用', disabled: true },
  { text: '选项二', icon: 'star-o' },
  { text: '选项三' },
]);

const onSelect = (action) => {
  showToast(action.text)
};
</script>