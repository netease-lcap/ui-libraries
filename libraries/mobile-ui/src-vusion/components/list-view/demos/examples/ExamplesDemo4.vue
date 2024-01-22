<!-- 后端分页与加载更多 -->
<template>
<van-list-view multiple v-model="values">
    <van-list-view-item text="Java" value="java"></van-list-view-item>
    <van-list-view-item text="Nodejs" value="nodejs"></van-list-view-item>
    <van-list-view-item text="Go" value="go"></van-list-view-item>
</van-list-view>
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