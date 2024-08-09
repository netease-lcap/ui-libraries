<template>
    <div>
        <div style="margin: 0 0 5px 0">水平排列</div>
        <u-checkboxes v-model="checkedList1">
            <u-checkbox label="关">关</u-checkbox>
            <u-checkbox label="开">开</u-checkbox>
            <u-checkbox label="关_禁用" disabled>关_禁用</u-checkbox>
            <u-checkbox label="开_禁用" disabled>开_禁用</u-checkbox>
        </u-checkboxes>

        <div style="margin: 24px 0 5px 0">垂直排列</div>
        <u-checkboxes direction="vertical" v-model="checkedList2">
            <u-checkbox label="关">关</u-checkbox>
            <u-checkbox label="开">开</u-checkbox>
            <u-checkbox label="关_禁用" disabled>关_禁用</u-checkbox>
            <u-checkbox label="开_禁用" disabled>开_禁用</u-checkbox>
        </u-checkboxes>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkedList1: ['开', '开_禁用'],
            checkedList2: ['开', '开_禁用']
        };
    },
};
</script>