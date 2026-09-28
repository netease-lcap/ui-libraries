<template>
<input :value="value" :class="$style.input" @input="handleInput" />
</template>
<script setup>

const props = defineProps({
  value: {
    default: '',
  },
  onChange: {
    default: () => () => {},
  }
});

const handleInput = (e) => {
  props.onChange(e.target.value)
}

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