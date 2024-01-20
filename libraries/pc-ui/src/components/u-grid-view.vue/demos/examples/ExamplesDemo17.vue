<!-- 加载更多 -->
<template>
<u-grid-layout :repeat="3">
    <u-grid-layout-column>
        <u-grid-view multiple show-head title="手动点击加载更多" v-model="values" :data-source="list" pageable="load-more"></u-grid-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-grid-view multiple show-head title="滚动自动加载更多" v-model="values" :data-source="list" pageable="auto-more"></u-grid-view>
    </u-grid-layout-column>
</u-grid-layout>
</template>
<script>
export default {
    data() {
        // 构造数量较多的 500 条数据
        let list = [];
        for (let i = 1; i <= 500; i++)
            list.push('item' + i);
        list = list.map((text) => ({ text, value: text }));

        return {
            value: undefined,
            values: [],
            list,
        };
    },
};
</script>