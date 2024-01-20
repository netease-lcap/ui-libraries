<!-- 设置空态 -->
<template>
<u-linear-layout>
    <u-checkbox-card v-model="value" placeholder="当前无相关环境" :data="data"></u-checkbox-card>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: ['1', '4'],
            data: [],
        };
    },
};
</script>