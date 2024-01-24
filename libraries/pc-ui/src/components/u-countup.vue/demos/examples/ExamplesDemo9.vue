<!-- 渐变结束回调函数 -->
<template>
    <u-linear-layout>
        <u-countup :end="100" :auto-start="autoStart" :end-callback="end"></u-countup>
        <u-button style="vertical-align: bottom;" color="primary" @click="start">autoStart</u-button>
    </u-linear-layout>
</template>
<script>
export default{
    data() {
        return {
            autoStart: false,
        };
    },
    methods: {
        start() {
            this.autoStart = true;
        },
        end() {
            console.log('渐变结束');
        },
    },
};
</script>