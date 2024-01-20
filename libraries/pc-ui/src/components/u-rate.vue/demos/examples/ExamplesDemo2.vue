<!-- 允许半选 -->
<template>
<u-rate v-model="rating" allowHalf></u-rate>
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