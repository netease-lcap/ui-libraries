<!-- 多项选择 -->
<template>
<u-list-view multiple v-model="values">
    <u-list-view-item value="cup">水杯</u-list-view-item>
    <u-list-view-item value="nut">坚果</u-list-view-item>
    <u-list-view-item value="towel">毛巾</u-list-view-item>
    <u-list-view-item value="sofa">沙发</u-list-view-item>
</u-list-view>
</template>

<script>
export default {
    data() {
        return { values: ['nut', 'towel'] };
    },
};
</script>