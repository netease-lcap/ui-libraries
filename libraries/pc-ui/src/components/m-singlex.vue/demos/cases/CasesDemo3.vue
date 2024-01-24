<!-- 双向绑定 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <m-singlex v-model="value">
        <m-singlex-item value="cup">水杯</m-singlex-item>
        <m-singlex-item value="coffee">咖啡</m-singlex-item>
        <m-singlex-item value="nut">坚果</m-singlex-item>
        <m-singlex-item value="towel">毛巾</m-singlex-item>
        <m-singlex-item value="sofa">沙发</m-singlex-item>
    </m-singlex>
    <m-singlex :value.sync="value">
        <m-singlex-item value="cup">水杯</m-singlex-item>
        <m-singlex-item value="coffee">咖啡</m-singlex-item>
        <m-singlex-item value="nut">坚果</m-singlex-item>
        <m-singlex-item value="towel">毛巾</m-singlex-item>
        <m-singlex-item value="sofa">沙发</m-singlex-item>
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