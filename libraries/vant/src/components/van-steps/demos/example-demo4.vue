<template>
  <div>
    <van-steps :dataSource="dataSource" valueField="value" ref="stepsRef" activeIcon="star-o" inactiveIcon="cart-o"
      finishIcon="fire-o">
      <template #content="{ item }">
        <van-cell :title="item.label" :label="item.value" />
      </template>
    </van-steps>

    <button style="margin-top: 12px" @click="prev">Prev step</button>

    <button style="margin-top: 12px" @click="next">Next step</button>
  </div>
</template>

<!-- 不传 active，完全由组件内部控制 active 的值 -->
<script lang="ts" setup>
import { ref } from 'vue'
const stepsRef = ref()

const dataSource = ref([{
  label: '步骤一',
  value: '1.1',
}, {
  label: '步骤二',
  value: '2.1',
}, {
  label: '步骤三',
  value: '3.1',
}]);

const prev = () => {
  stepsRef.value?.prev();
}

const next = () => {
  stepsRef.value?.next();
}
</script>
