<!-- 表单验证 -->

<template>
  <div><u-form>
    <u-form-item label="单日期" required rules="required">
        <u-time-picker time="15:46:33" clearable></u-time-picker>
    </u-form-item>
    <u-form-item label="日期范围" required rules="required">
        <u-time-picker startTime="12:46:33" endTime="18:18:33" range clearable></u-time-picker>
    </u-form-item>
</u-form></div>
</template>