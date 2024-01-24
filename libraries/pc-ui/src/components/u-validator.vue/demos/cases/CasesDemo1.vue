<!-- blur 后从绑定变量更新 -->
<template>
    <u-linear-layout>
        <u-validator label="用户名" rules="required" placement="bottom">
            <u-input :value.sync="value"></u-input>
        </u-validator>
        <u-button @click="onClick">change</u-button>
    </u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: '',
        };
    },
    methods: {
        onClick() {
            this.value = Math.random();
        }
    },
};
</script>