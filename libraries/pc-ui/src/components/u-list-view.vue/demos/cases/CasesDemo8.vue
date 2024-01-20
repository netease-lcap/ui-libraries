<!-- 前端分页 -->
<template>
<div>
<u-list-view :data="test" style="height: 182px"></u-list-view>
<u-button @click="onClick">传入</u-button>
</div>
</template>
<script>
export default {
    data() {
        // 构造数量较多的 500 条数据
        let data = [];
        for (let i = 1; i <= 100; i++)
            data.push('item' + i);
        data = data.map((text) => ({ text, value: text }));

        return { data, test: null };
    },
    methods: {
        onClick() {
            this.test = this.data;
        },
    },
};
</script>