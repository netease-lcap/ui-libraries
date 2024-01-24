<!-- 范围选择变量绑定 -->
<template>
    <u-time-picker
        range
        :start-time.sync="starTime"
        :end-time.sync="endTime"
        @change="onChange">
    </u-time-picker>
</template>
<script>
export default {
    data() {
        return {
            starTime: '12:46:33',
            endTime: '18:18:33',
        };
    },
    methods: {
        onChange(event) {
            console.log(event);
        },
    },
};
</script>