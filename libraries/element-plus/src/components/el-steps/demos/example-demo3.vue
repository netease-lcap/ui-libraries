<template>
  <div>
    <el-steps :dataSource="dataSource" nameField="value" v-model="active" ref="stepsRef">
      <template #title="{ item }"><el-text :text="item.label" /></template>
      <template #description="{ item }"><el-text :text="item.value" /></template>
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </div>
</template>

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

const active = ref('1.1')

const next = () => {
  stepsRef.value?.next();
}
</script>
