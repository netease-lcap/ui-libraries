<!-- size -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout >
        <u-cascader :data="data" width="mini" height="mini"></u-cascader>
        <u-cascader :data="data" width="mini" height="normal"></u-cascader>
        <u-cascader :data="data" width="mini" height="medium"></u-cascader>
    </u-linear-layout>
    <u-linear-layout>
        <u-cascader :data="data" width="small" height="mini"></u-cascader>
        <u-cascader :data="data" width="small" height="normal"></u-cascader>
        <u-cascader :data="data" width="small" height="medium"></u-cascader>
    </u-linear-layout>
    <u-linear-layout>
        <u-cascader :data="data" width="medium" height="mini"></u-cascader>
        <u-cascader :data="data" width="medium" height="normal"></u-cascader>
        <u-cascader :data="data" width="medium" height="medium"></u-cascader>
    </u-linear-layout>
    <u-linear-layout>
        <u-cascader :data="data" width="large" height="large"></u-cascader>
        <u-cascader :data="data" width="huge" height="huge"></u-cascader>
        <u-cascader :data="data" width="full" height="full"></u-cascader>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { text: '理学', value: '1' },
                { text: '工学', value: '2' },
            ],
        };
    },
};
</script>