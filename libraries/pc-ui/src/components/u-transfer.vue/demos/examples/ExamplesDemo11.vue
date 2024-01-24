<!-- 分页与加载更多 -->
<template>
<u-transfer :source="source" :target="target" show-head pageable :page-size="10"></u-transfer>
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
            source: list,
            target: [],
        };
    },
};
</script>