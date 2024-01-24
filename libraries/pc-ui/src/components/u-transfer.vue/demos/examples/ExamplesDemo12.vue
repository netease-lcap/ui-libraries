<!-- 加载更多 -->
<template>
<u-linear-layout direction="vertical">
    <u-transfer :source="source" :target="target" show-head pageable="load-more"></u-transfer>
    <u-transfer :source="source" :target="target" show-head pageable="auto-more"></u-transfer>
</u-linear-layout>
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
            source: list,
            target: [],
        };
    },
};
</script>