<!-- 加载中 -->
<template>
<u-linear-layout gap="small">
    <u-button color="primary" loading text="创建实例"></u-button>
    <u-button color="primary" icon="add" loading disabled text="创建实例"></u-button>
    <u-button color="primary" shape="square" icon="refresh"
        :loading="loading" :disabled="loading"
        @click="loading = true">
    </u-button>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
        };
    },
};
</script>