<!-- 多项选择 -->
<template>
<u-grid-view multiple v-model="values">
    <u-grid-view-item value="cup">水杯</u-grid-view-item>
    <u-grid-view-item value="nut">坚果</u-grid-view-item>
    <u-grid-view-item value="towel">毛巾</u-grid-view-item>
    <u-grid-view-item value="sofa">沙发</u-grid-view-item>
</u-grid-view>
</template>

<script>
export default {
    data() {
        return { values: ['nut', 'towel'] };
    },
};
</script>