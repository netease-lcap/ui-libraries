<!-- 对齐和清空问题 -->
<template>
<u-linear-layout>
    <u-select clearable multiple multiple-appearance="tags" v-model="value" placeholder="过多时省略">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <u-select clearable multiple multiple-appearance="tags" tags-overflow="collapse" v-model="value" placeholder="过多时收缩">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <span>与文字对齐</span>
    <u-select clearable multiple multiple-appearance="tags" tags-overflow="visible" v-model="value" placeholder="过多时显示">
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
            value: ['sofa', 'nut', 'towel'],
        };
    },
};
</script>