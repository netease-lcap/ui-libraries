<!-- 自动合并列被隐藏后，合并不能迁移到后面的列 -->
<template>
    <u-table-view ref="tableview" :data="data" :default-column-width="100">
        <u-table-view-column title="property1" field="property1"></u-table-view-column>
        <u-table-view-column title="property2" field="property2"></u-table-view-column>
        <u-table-view-column title="property3" field="property3"></u-table-view-column>
        <u-table-view-column title="property4" field="property4" :auto-row-span="true"></u-table-view-column>
        <u-table-view-column title="property5" field="property5"></u-table-view-column>
    </u-table-view>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { property1: 'p1-1', property2: 'p2-1', property3: 'p3-1', property4: '12rdd', property5: '12edq1' },
                { property1: 'p1-2', property2: 'p2-2', property3: 'p3-2', property4: '12e12', property5: '12rf123' },
                { property1: 'p1-3', property2: 'p2-3', property3: 'p3-3', property4: '32131', property5: 'e132' },
                { property1: 'p1-4', property2: 'p2-4', property3: 'p3-4', property4: '32131', property5: '1e22e21' },
            ],
        };
    },
    methods: {
        // 等价于「展示列」里取消勾选 property4 并点击确定
        // 见 column-config.vue handleColumnsHidden：直接改列的 currentHidden
        hideColumn(field) {
            const tableVM = this.$refs.tableview;
            const columnVM = tableVM.columnVMs.find((vm) => vm.field === field);
            columnVM.currentHidden = true;
        },
        showColumn(field) {
            const tableVM = this.$refs.tableview;
            const columnVM = tableVM.columnVMs.find((vm) => vm.field === field);
            columnVM.currentHidden = columnVM.hidden;
        },
    },
};
</script>
