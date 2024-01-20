<!-- 双向绑定 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <m-singlex v-model="value">
        <m-singlex-item value="cup" text="水杯"></m-singlex-item>
        <m-singlex-item value="coffee" text="咖啡"></m-singlex-item>
        <m-singlex-item value="nut" text="坚果"></m-singlex-item>
        <m-singlex-item value="towel" text="毛巾"></m-singlex-item>
        <m-singlex-item value="sofa" text="沙发"></m-singlex-item>
    </m-singlex>
    <m-singlex :value.sync="value">
        <m-singlex-item value="cup" text="水杯"></m-singlex-item>
        <m-singlex-item value="coffee" text="咖啡"></m-singlex-item>
        <m-singlex-item value="nut" text="坚果"></m-singlex-item>
        <m-singlex-item value="towel" text="毛巾"></m-singlex-item>
        <m-singlex-item value="sofa" text="沙发"></m-singlex-item>
    </m-singlex>
</u-linear-layout>
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