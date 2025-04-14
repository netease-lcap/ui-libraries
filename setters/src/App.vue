<script setup lang="ts">
import { ref } from 'vue';
import InputSetter from './setters/InputSetter.vue';

const value = ref('33');

const change = (e) => {
  value.value = e
}


</script>

<template>
  <div class="root">
    <span>value: {{ value }}</span>
    <InputSetter :value="value" @change="change" />
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #333;
}
</style>
