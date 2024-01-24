<!-- 格式化 -->
<template>
    <div>
        <u-date-time-picker 
            :advanced-format="{enable: false, value: 'YYYY年M月D日 HH时mm分ss秒'}"
            :value.sync="date"
            show-date-formatter="M/D/YYYY"
            minUnit="second"
            show-time-formatter="HH时mm分ss秒"
            clearable></u-date-time-picker>
        <u-date-time-picker
            :advanced-format="{enable: true, value: 'YYYY年M月D日 HH时mm分'}"
            range
            :start-date.sync="startDate"
            :end-date.sync="endDate"
            @change="change"
            @select="select"
            @blur="blur">
        </u-date-time-picker>
    </div>

</template>
<script>
export default {
    data() {
        return {
            date: undefined,
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