<template>
  <div>
    <el-date-picker :modeValue="value" type="date" placeholder="Pick a day" @change="onChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onChange(value) {
      console.log('change', value);
    },
  },
};
</script>

<style scoped></style>
