<template>
  <div>
    <van-steps :dataSource="dataSource" valueField="value" :active="active2" ref="stepsRef">
      <template #content="{ item }">
        <van-cell :title="item.label" :label="item.value" />
      </template>
    </van-steps>

    <button style="margin-top: 12px" @click="prev">Prev step</button>

    <button style="margin-top: 12px" @click="next">Next step</button>
  </div>
</template>

<!-- 传入 active，由用户控制 active 的值 -->
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

const active2 = ref(0)

const prev = () => {
  active2.value -= 1;
}

const next = () => {
  active2.value += 1;
}
</script>
