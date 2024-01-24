<!-- 自动调整 -->
<template>
<u-linear-layout>
    <u-textarea v-model="value" auto-size="both"></u-textarea>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: 'abc',
        };
    },
};
</script>