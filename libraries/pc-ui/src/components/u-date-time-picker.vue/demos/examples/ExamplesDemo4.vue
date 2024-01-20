<!-- 选择日期 -->
<template>
<u-date-time-picker v-model="date"></u-date-time-picker>
</template>
<script>
export default {
    data() {
        return {
            date: '',
        };
    },
};
</script>