<!-- 允许清除 -->
<template>
<u-rate v-model="rating" :clearable="true"></u-rate>
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