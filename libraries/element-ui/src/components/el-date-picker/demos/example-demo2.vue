<!-- 其他日期单位 -->
<!--  通过扩展基础的日期选择，可以选择周、月、年或多个日期 -->
<template>
  <div>
    <div class="container">
      <div class="block">
        <span class="demonstration">周</span>
        <el-date-picker
          v-model="value1"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">月</span>
        <el-date-picker v-model="value2" type="month" placeholder="选择月">
        </el-date-picker>
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">年</span>
        <el-date-picker v-model="value3" type="year" placeholder="选择年">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">多个日期</span>
        <el-date-picker
          type="dates"
          v-model="value4"
          placeholder="选择一个或多个日期">
        </el-date-picker>
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">多个月</span>
        <el-date-picker
          type="months"
          v-model="value5"
          placeholder="选择一个或多个月">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">多个年</span>
        <el-date-picker
          type="years"
          v-model="value6"
          placeholder="选择一个或多个年">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
    };
  },
};
</script>
