<!-- 单选模式 -->
<template>
<m-complex v-model="value">
    <m-complex-item value="cup">水杯</m-complex-item>
    <m-complex-item value="coffee">咖啡</m-complex-item>
    <m-complex-item value="nut">坚果</m-complex-item>
    <m-complex-item value="towel">毛巾</m-complex-item>
    <m-complex-item value="sofa">沙发</m-complex-item>
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