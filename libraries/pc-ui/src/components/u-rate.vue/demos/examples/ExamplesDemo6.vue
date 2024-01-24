<!-- 辅助文字 -->
<template>
<u-rate :value="rating" showText showTooltip></u-rate>
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