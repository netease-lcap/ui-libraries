<!-- 数据日历，reload方法 -->
<template>
<u-linear-layout>
     <u-button @click="value=''">清空选中数据</u-button>
    <u-button @click="changeValue">改变数据</u-button>
    <u-calendar-view :data-source="load" :value.sync="value" ref="calendarView">
        <template #default="scope">
            <p v-if="scope.item.apple">苹果: {{scope.item.apple}}</p>
            <p v-if="scope.item.orange">橘子: {{scope.item.orange}}</p>
        </template>
    </u-calendar-view>
    <u-button @click="reload">重新加载</u-button>
</u-linear-layout>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((resolve, rej) => setTimeout(() => resolve(data), timeout));

export default {
    data() {
        return {
            value: '2021-10-01',
        };
    },
    methods: {
        load(params) {
            console.log('load');
            return mockRequest([{
                startTime: '2021-10-05',
                orange: 8,
            }, {
                startTime: '2021-10-16',
                apple: 1,
            }, {
                startTime: '2021-10-31',
                apple: 3,
                orange: 2,
            }]);
        },
        reload() {
            console.log('reload');
            this.$refs.calendarView.reload();
        },
        changeValue() {
            this.value = '2021-10-31';
        },
    },
}
</script>