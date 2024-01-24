<!-- 快捷方式 -->
<template>
<u-button @click="show">弹出消息</u-button>
</template>

<script>
export default {
    methods: {
        show() {
            this.$toast.show('这是一条消息');
        },
    },
};
</script>