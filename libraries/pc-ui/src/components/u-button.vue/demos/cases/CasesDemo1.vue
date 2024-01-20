<!-- 按钮自动加载 -->
<template>
<u-button color="primary" @click="onClick" text="链接"></u-button>
</template>
<script>
export default {
    methods: {
        onClick(e) {
            return new Promise((res, rej) => {
                setTimeout(() => res(), 300);
            })
        },
    }
};
</script>