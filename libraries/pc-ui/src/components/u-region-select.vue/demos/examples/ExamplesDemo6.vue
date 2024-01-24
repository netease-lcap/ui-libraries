<!-- 转换为地区名格式 -->
<template>
    <u-region-select v-model="address" converter="name" @change="onChange"></u-region-select>
</template>
<script>
export default {
    data() {
        return {
            address: '浙江省/杭州市/滨江区',
        };
    },
    methods: {
        onChange({ value }) {
            console.log(value)
        }
    }
};
</script>