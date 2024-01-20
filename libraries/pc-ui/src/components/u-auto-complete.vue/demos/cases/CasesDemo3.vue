<!-- 双向绑定 -->
<template>
<u-linear-layout>
    <u-auto-complete v-model="value" maxlength="12" placeholder="请输入端口号"></u-auto-complete>
    <u-auto-complete :value.sync="value" maxlength="12" placeholder="请输入端口号"></u-auto-complete>
    <u-auto-complete v-model.number="numberValue" maxlength="12" placeholder="请输入端口号"></u-auto-complete>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: '3306',
            numberValue: 3306,
        };
    },
};
</script>