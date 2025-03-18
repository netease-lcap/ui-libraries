<template>
  <div>
    <el-steps style="max-width: 600px" v-model:active="active" finish-status="success" ref="stepsRef">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>

    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const stepsRef = ref()

const active = ref(1)

const next = () => {
  stepsRef.value?.next();
}
</script>
