<!-- 基本用法 -->
<template>
<u-rate v-model="rating"></u-rate>
</template>
<script>
export default {
    data() {
        return {
            rating: 3,
        };
    },
};
</script>