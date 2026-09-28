<template>
  <div>
    <!-- <el-date-picker :modelValue="value" type="date" placeholder="Pick a day2" @change="onChange" /> -->
    <el-date-picker prefixicon="Plus" v-model="value" type="date" placeholder="Pick a day2" @change="onChange" @calendar-change="calendarChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '2024-08-02',
    };
  },
  methods: {
    onChange(value) {
      console.log(this.value,typeof this.value);
      console.log('change', value);
    },
    calendarChange(value) {
      debugger;
      console.log('calendarChange', value);
    },
  },
  mounted() {
    console.log('mounted');
    setTimeout(() => {
      this.value = undefined;
    },2000)
  }
};
</script>

<style scoped></style>
