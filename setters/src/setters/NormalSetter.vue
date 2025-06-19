<template>
  <el-button @click="dialogFormVisible = true">按钮</el-button>
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-input v-model="myValue" @input="handleInput" autocomplete="off" />
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  value: {
    default: '',
  },
  onChange: {
    default: () => () => {},
  },
});

const dialogFormVisible = ref(false);
const myValue = ref('');
const handleInput = (e) => {
  props.onChange(e);
};
</script>
<style module>
.input {
  width: 256px;
  height: 28px;
  background-color: #fff;
  outline: none;
  border: 1px solid #ccc;
  color: #333;

  border-radius: 4px;
  &:hover,
  &:focus {
    border-color: blue;
  }
}
</style>
