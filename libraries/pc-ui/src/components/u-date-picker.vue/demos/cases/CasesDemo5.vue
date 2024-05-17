<!-- 格式化 -->
<template>
    <div>
        <u-date-picker
            :value.sync="quarter"
            picker="quarter"
            show-formatter="YYYY年QQ"
            width="large"
            clearable
            @change="onChange"
            @slect="onSelect"
            @toggle="onToggle">
        </u-date-picker>
        <u-date-picker
            :value.sync="date"
            picker="week"
            show-formatter="GGGG年第W周"
            width="large"
            clearable
            @change="onChange"
            @slect="onSelect"
            @toggle="onToggle">
        </u-date-picker>
    </div>
</template>
<script>
export default {
    data() {
        return {
            date: '2023-07-07',
            quarter: '2023-07-07'
        }
    },
    methods: {
        onChange($event) {
            console.log('onChange', $event);
        },
        onSelect($event) {
            console.log('onSelect',$event);
        },
        onToggle($event) {
            console.log('onToggle',$event);
        },
    },
};
</script>