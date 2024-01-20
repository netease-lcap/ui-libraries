<!-- 只读 -->
<template>
<u-rate v-model="rating" readonly></u-rate>
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