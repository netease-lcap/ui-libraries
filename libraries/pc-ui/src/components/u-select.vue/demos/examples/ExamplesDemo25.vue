<!-- 前端加载更多 -->
<template>
<u-select v-model="value" :data-source="list" placeholder="前端加载更多"
    pageable :page-size="10"></u-select>
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