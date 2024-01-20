<!-- 只读，值为小数 -->
<template>
<div>
<u-rate :value="rating" readonly></u-rate>
<u-rate :value="rating" readonly showValue></u-rate>
</div>
</template>
<script>
export default {
    data() {
        return {
            rating: 3.6,
        };
    },
};
</script>