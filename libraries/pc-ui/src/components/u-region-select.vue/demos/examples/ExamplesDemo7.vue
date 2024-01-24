<!-- 转换为地区码格式 -->
<template>
    <u-region-select v-model="address" converter="code" @change="onChange"></u-region-select>
</template>
<script>
export default {
    data() {
        return {
            address: '330108',
        };
    },
    methods: {
        onChange(event) {
            console.log(event)
        }
    }
};
</script>