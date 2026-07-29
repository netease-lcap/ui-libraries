<template>
<div :class="$style.root" v-html="text">
</div>
</template>
<script setup lang="ts">
export interface {{compName}}Props {
  text?: string;
  type?: 'primary' | 'secondary' | 'default';
}

const props = withDefaults(defineProps<{{compName}}Props>(), {
  text: 'Hello',
  type: 'default',
});

</script>
<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 600px;
  height: 400px;
  background-color: red;
  color: #fff;
  font-size: 24px;
  border-radius: 12px;
}
</style>
