<!-- 数据日历 -->
<template>
    <u-calendar-view :data="data" :value.sync="value" @change="onChange" @select="onSelect" @click-cell="onClickCell">
        <template #default="scope">
            <p v-if="scope.item.apple">苹果: {{scope.item.apple}}</p>
            <p v-if="scope.item.orange">橘子: {{scope.item.orange}}</p>
        </template>
    </u-calendar-view>
</template>
<script>
export default{
    data() {
        return {
            data: [{
                startTime: '2021-10-05',
                orange: 8,
            }, {
                startTime: '2021-10-16',
                apple: 1,
            }, {
                startTime: '2021-10-31',
                apple: 3,
                orange: 2,
            }],
            value: '2021-10-01',
        };
    },
    watch: {
        value(val, oldVal) {
            console.log('val', val);
            console.log('oldVal', oldVal);
        },
    },
    methods: {
        onChange(val) {
            console.log('onChange', val);
        },
        onSelect(val) {
            console.log('onSelect', val);
        },
        onClickCell(val) {
            console.log('onClickCell', val);
        },
    },
};
</script>