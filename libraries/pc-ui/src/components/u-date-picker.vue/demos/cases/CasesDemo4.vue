<!-- 表单验证 -->

<template>
  <div><u-form>
    <u-form-item label="单日期" required rules="required">
        <u-date-picker date="2022-03-10" clearable></u-date-picker>
    </u-form-item>
    <u-form-item label="日期范围" required rules="required">
        <u-date-picker
            start-date="2022-03-10"
            end-date="2022-03-20"
            range
            clearable>
        </u-date-picker>
    </u-form-item>
</u-form></div>
</template>