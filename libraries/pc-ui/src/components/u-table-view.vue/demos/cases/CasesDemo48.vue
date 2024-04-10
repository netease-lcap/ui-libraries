<!-- 空表格全选选中 -->

<template>
    <u-linear-layout direction="vertical">
        <u-button @click="refresh">刷新</u-button>
        <u-table-view :data-source="load" ref="tableView">
            <u-table-view-column type="checkbox" title="选择" width="8%"></u-table-view-column>
            <u-table-view-column title="用户名" field="name" width="15%"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
            <u-table-view-column title="地址" field="address"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            count: 0,
        }
    },
    methods: {
        load() {
            if(this.count % 2 === 0)
                return [{name: '1'}, {name: '2'}];
            return [];
        },
        refresh() {
            this.count++ ;
            this.$refs.tableView.reload();
        }
    }
};
</script>