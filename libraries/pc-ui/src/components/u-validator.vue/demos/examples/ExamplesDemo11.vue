<!-- 注册验证规则 -->
<template>
<u-form-item label="颜色" rules="hexColor">
    <u-input placeholder="请输入十六进制颜色值"></u-input>
</u-form-item>
</template>
<script>
export default {
    validators: {
        hexColor: (value) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value),
    },
    rules: {
        hexColor: { validate: 'hexColor', message: '颜色值格式不正确', trigger: 'blur' },
    },
};
</script>