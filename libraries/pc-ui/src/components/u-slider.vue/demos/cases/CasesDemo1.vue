<!-- 多滑块最大值和最小值 -->
<template>
    <u-slider multiple v-model="value" :min="10" :max="50"></u-slider>
</template>
<script>
export default {
    data() {
        return {
            value: [20, 35],
        };
    },
};
</script>