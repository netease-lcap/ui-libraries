<!-- 多选数据可清空 -->
<template>
    <u-linear-layout direction="vertical">
        <u-button @click="value=[]">清空选中数据</u-button>
        <u-button @click="changeValue">改变数据</u-button>
        <u-calendar-view :data="data" :value.sync="value" @change="onChange" @select="onSelect" :multiple="true">
            <template #default="scope">
                <p v-if="scope.item.apple">苹果: {{scope.item.apple}}</p>
                <p v-if="scope.item.orange">橘子: {{scope.item.orange}}</p>
            </template>
        </u-calendar-view>
    </u-linear-layout>
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
            value: ['2021-10-01', '2021-10-05'],
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
        changeValue() {
            this.value = ['2021-10-10', '2021-10-15'];
        }
    },
};
</script>