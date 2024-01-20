<!-- Value 绑定 -->
<template>
<u-switch v-model="value" width="wide" disabled>{{ value ? 'ON' : 'OFF' }}</u-switch>
</template>
<script>
export default {
    data() {
        return { value: true };
    },
};
</script>