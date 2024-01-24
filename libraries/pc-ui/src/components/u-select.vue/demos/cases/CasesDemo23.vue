<!-- Tag 方式 -->
<template>
<u-linear-layout>
    <u-select v-if="!list.length" placeholder="暂无可选的项" disabled></u-select>
    <u-select v-else v-model="value">
        <u-select-item v-for="item in list" :key="item.value" :value="item.value">{{ item.text }}</u-select-item>
    </u-select>
    <u-button @click="switchList">切换</u-button>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: undefined,
            list: [],
            list1: ['A', 'B', 'C'].map((value) => ({ text: value + value, value })),
            list2: ['D', 'E', 'F', 'G'].map((value) => ({ text: value + value, value })),
        };
    },
    methods: {
        switchList() {
            if (!this.list.length)
                this.list = this.list1;
            else if (this.list === this.list1)
                this.list = this.list2;
            else
                this.list = [];
        },
    },
};
</script>