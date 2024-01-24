<!-- 更新列表 -->
<template>
<div>
    <m-multiplex v-model="values">
        <m-multiplex-item v-for="item in list" :key="item.value" :value="item.value">{{ item.text }}</m-multiplex-item>
    </m-multiplex>
    <u-button @click="updateList">更新列表</u-button>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { value: 'cup', text: '水杯' },
                { value: 'coffee', text: '咖啡' },
                { value: 'nut', text: '坚果' },
                { value: 'towel', text: '毛巾' },
                { value: 'sofa', text: '沙发' },
            ],
            values: ['nut', 'towel', 'toothbrush'],
        };
    },
    methods: {
        updateList() {
            this.list = [
                { value: 'cup', text: '水杯' },
                { value: 'coffee', text: '咖啡' },
                { value: 'nut', text: '坚果' },
                { value: 'toothbrush', text: '牙刷' },
            ];
        },
    },
};
</script>