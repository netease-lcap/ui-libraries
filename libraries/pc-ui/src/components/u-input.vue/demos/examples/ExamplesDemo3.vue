<!-- 双向绑定 -->
<template>
<u-linear-layout>
    <u-input v-model="value" maxlength="12" placeholder="请输入端口号"></u-input>
    <u-input :value.sync="value" maxlength="12" placeholder="请输入端口号"></u-input>
    <u-input v-model.number="numberValue" maxlength="12" placeholder="请输入端口号"></u-input>
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