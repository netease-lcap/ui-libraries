<!-- 刚开始为空的情况 -->
<template>
    <u-linear-layout direction="vertical">
        <u-table-view striped :data-source="data" pageable :page-size="10">
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
        return { data: undefined };
    },
    created() {
        setTimeout(() => {
            this.data = [];
        }, 200);
    },
};
</script>