<template>
<u-button @click="onOpen">弹出消息</u-button>
</template>
<script>
export default {
    data() {
        return {
     };
    },
    methods: {
        onOpen() {
            this.$toast.show("弹出消息");
        },
    },
};
</script>
