<!-- 更新列表 -->
<template>
<div>
    <m-singlex v-model="value">
        <m-singlex-item v-for="item in list" :key="item.value" :value="item.value">{{ item.text }}</m-singlex-item>
    </m-singlex>
    <span>value: {{ value }}</span>
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
            value: 'toothbrush',
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