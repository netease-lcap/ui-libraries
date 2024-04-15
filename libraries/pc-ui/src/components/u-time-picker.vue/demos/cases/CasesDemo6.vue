<!-- 格式化 -->
<template>
<div>
    <u-time-picker
        :time.sync="time"
        @change="onChange"
        :advancedFormatEnable="true"
        advancedFormatValue="HH时mm分ss秒"
    >
    </u-time-picker>
    <u-time-picker
        range
        :start-time.sync="starTime"
        :end-time.sync="endTime"
        @change="onChange"
        :advancedFormatEnable="true"
        advancedFormatValue="HH时mm分ss秒"
    >
    </u-time-picker>
</div>

</template>
<script>
export default {
    data() {
        return {
            time: undefined,
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
