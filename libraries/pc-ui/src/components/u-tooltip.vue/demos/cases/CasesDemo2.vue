<!-- 更新数据 -->
<template>
<u-button>
    hover（默认）
    <u-tooltip @mousemove.native="onMouseMove">{{ count }}</u-tooltip>
</u-button>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        onMouseMove(e) {
            this.count++;
        },
    },
};
</script>