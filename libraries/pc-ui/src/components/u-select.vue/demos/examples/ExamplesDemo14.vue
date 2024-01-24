<!-- 多项选择 -->
<template>
<u-linear-layout>
    <u-select v-model="values" multiple style="width: 240px">
        <u-select-item text="Java" value="java"></u-select-item>
        <u-select-item text="Node.js" value="nodejs"></u-select-item>
        <u-select-item text="Go" value="go"></u-select-item>
        <u-select-item text="Python" value="python"></u-select-item>
    </u-select>
</u-linear-layout>
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