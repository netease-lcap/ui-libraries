<!-- Tags 风格 -->
<template>
<u-linear-layout>
    <u-select multiple size="large" multiple-appearance="tags" tags-overflow="visible" v-model="value" placeholder="过多时显示">
        <u-select-item value="cup">水杯水杯水杯水杯水杯</u-select-item>
        <u-select-item value="coffee">咖啡咖啡咖啡咖啡咖啡</u-select-item>
        <u-select-item value="nut">坚果坚果坚果坚果坚果</u-select-item>
        <u-select-item value="towel">毛巾毛巾毛巾毛巾毛巾</u-select-item>
        <u-select-item value="sofa">沙发沙发沙发沙发沙发</u-select-item>
    </u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: ['sofa', 'nut', 'towel'],
        };
    },
};
</script>