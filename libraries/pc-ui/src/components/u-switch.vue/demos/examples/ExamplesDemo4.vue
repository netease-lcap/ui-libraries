<!-- 调整尺寸 -->
<template>
<u-switch v-model="value" size="small" style="width: 52px;">{{ value ? 'LIST' : 'LIST' }}</u-switch>
</template>
<script>
export default {
    data() {
        return { value: false };
    },
};
</script>