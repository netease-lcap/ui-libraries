<!-- 单选模式 -->
<template>
<m-complex v-model="value">
    <m-complex-item value="cup" text="水杯"></m-complex-item>
    <m-complex-item value="coffee" text="咖啡"></m-complex-item>
    <m-complex-item value="nut" text="坚果"></m-complex-item>
    <m-complex-item value="towel" text="毛巾"></m-complex-item>
    <m-complex-item value="sofa" text="沙发"></m-complex-item>
</m-complex>
</template>
<script>
export default {
    data() {
        return {
            value: 'towel',
        };
    },
};
</script>