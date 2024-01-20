<!-- 后端分页与加载更多 -->
<template>
<u-list-view multiple v-model="values">
    <u-list-view-item text="Java" value="java"></u-list-view-item>
    <u-list-view-item text="Nodejs" value="nodejs"></u-list-view-item>
    <u-list-view-item text="Go" value="go"></u-list-view-item>
</u-list-view>
</template>
<script>
export default {
    data() {
        return {
            values: ['java', 'nodejs'],
        };
    },
};
</script>