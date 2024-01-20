<!-- 自动扩展大小 -->
<template>
<u-linear-layout>
    <u-auto-complete v-model="value" auto-size="horizontal"></u-auto-complete>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: 'abc',
        };
    },
};
</script>

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>