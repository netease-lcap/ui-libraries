<!-- 时间单位容错 -->
<template>
    <u-time-picker minUnit="minute" :time.sync="time"></u-time-picker>
</template>
<script>
export default {
    data() {
        return {
            // 传入值单位为秒，应该有容错
            time: '02:02:00',
        };
    },
    mounted() {
        setTimeout(() => {
            // 这里变更后，之前会变成当前时间，已修复
            this.time = '12:30:00';
        }, 200);
    },
};
</script>