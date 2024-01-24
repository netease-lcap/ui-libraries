<!-- 范围变量绑定 -->
<template>
    <u-date-time-picker
        range
        :start-date.sync="startDate"
        :end-date.sync="endDate"
        @change="change"
        @select="select"
        @blur="blur">
    </u-date-time-picker>
</template>
<script>
export default {
    data() {
        return {
            startDate: '2022-03-10',
            endDate: '2022-03-20',
        };
    },
    methods: {
        change(event) {
            console.log('change', event);
        },
        select(event) {
            console.log('select', event);
        },
        blur(event) {
            console.log('blur', event);
        },
    },
};
</script>