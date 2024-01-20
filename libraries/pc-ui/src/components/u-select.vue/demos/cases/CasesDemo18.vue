<!-- 保持顺序 -->
<template>
<u-linear-layout>
    <u-select multiple multiple-appearance="tags" tags-overflow="visible" v-model="value1" placeholder="不保持顺序（默认）">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <u-select multiple multiple-appearance="tags" tags-overflow="visible" keep-order v-model="value2" placeholder="保持顺序">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value1: ['nut', 'towel'],
            value2: ['nut', 'towel'],
        };
    },
};
</script>