<!-- value -->
<template>
<u-toc :router="false" v-model="value">
    <u-toc-item label="基础示例" value="examples">
        <u-toc-item label="基本用法" value="基本用法"></u-toc-item>
        <u-toc-item label="value" value="value"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UToc API" value="utocapi">
        <u-toc-item label="Props/Attrs" value="propsattrs"></u-toc-item>
        <u-toc-item label="Slots" value="slots"></u-toc-item>
        <u-toc-item label="Events" value="events"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UTocItem API" value="utocitemapi">
        <u-toc-item label="Props/Attrs" value="propsattrs1"></u-toc-item>
        <u-toc-item label="Slots" value="slots1"></u-toc-item>
        <u-toc-item label="Events" value="events1"></u-toc-item>
    </u-toc-item>
</u-toc>
</template>
<script>
export default {
    data() {
        return {
            value: 'utocitemapi',
        };
    },
};
</script>