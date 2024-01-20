<!-- 保持顺序 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <m-multiplex v-model="values1">
        <m-multiplex-item value="cup">水杯</m-multiplex-item>
        <m-multiplex-item value="coffee">咖啡</m-multiplex-item>
        <m-multiplex-item value="nut">坚果</m-multiplex-item>
        <m-multiplex-item value="towel">毛巾</m-multiplex-item>
        <m-multiplex-item value="sofa">沙发</m-multiplex-item>
    </m-multiplex>
    <m-multiplex v-model="values2" keep-order>
        <m-multiplex-item value="cup">水杯</m-multiplex-item>
        <m-multiplex-item value="coffee">咖啡</m-multiplex-item>
        <m-multiplex-item value="nut">坚果</m-multiplex-item>
        <m-multiplex-item value="towel">毛巾</m-multiplex-item>
        <m-multiplex-item value="sofa">沙发</m-multiplex-item>
    </m-multiplex>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            values1: ['towel', 'nut'],
            values2: ['towel', 'nut'],
        };
    },
};
</script>