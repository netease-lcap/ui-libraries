<!-- 基础表单 -->

<template>
  <u-form
    ><u-form-item required layout="center">
        <template #label><u-text text="名称"></u-text></template>
        <u-input placeholder="由字母、数字和中划线组成"></u-input>
    </u-form-item
    ><u-form-item required layout="center">
        <template #label><u-text text="类型"></u-text></template>
        <u-radios>
            <u-radio label="A"><template #item><u-text text="类型 A"></u-text></template></u-radio>
            <u-radio label="B"><template #item><u-text text="类型 B"></u-text></template></u-radio>
        </u-radios>
    </u-form-item
    ><u-form-item layout="center">
        <u-button color="primary">立即创建</u-button>
    </u-form-item
></u-form>
</template>
