<template>
  <div>
    <el-date-picker
      v-model="value"
      type="dates"
      placeholder="Pick a day2"
  
      minDate="2025-01-01"
         maxDate="2025-01-03" 
      @change="onChange"
      @calendar-change="calendarChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      startValue: '2024-08-02',
      endValue: '2024-08-03',
    };
  },
  methods: {
    onChange(value) {
      console.log('change', value);
    },
    calendarChange(value) {
      // console.log('calendarChange', value);
    },
  },
  mounted() {
    setTimeout(() => {
      this.value = undefined;
    },2000)
  }
};
</script>

<style scoped></style>
