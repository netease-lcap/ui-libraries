<!-- 前端分页 -->
<template>
<u-grid-layout :repeat="3">
    <u-grid-layout-column>
        <u-list-view show-head title="单选列表" v-model="value" :data-source="list" pageable :page-size="10"></u-list-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-list-view multiple show-head title="多选列表" v-model="values" :data-source="list" pageable="pagination" :page-size="10"></u-list-view>
    </u-grid-layout-column>
</u-grid-layout>
</template>
<script>
export default {
    data() {
        // 构造数量较多的 500 条数据
        let list = [];
        for (let i = 1; i <= 100; i++)
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