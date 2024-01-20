<!-- 空表格显示数据异常 -->
<template>
<div>
    <u-button @click="add(), $refs.tableView.load()">添加</u-button>
    <u-table-view ref="tableView" striped :data-source="load" pageable :page-size="10" remote-paging show-total show-sizer>
        <u-table-view-column title="用户名" field="name" width="15%"></u-table-view-column>
        <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column title="地址" field="address"></u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
</div>
</template>
<script>
const data = [];

export default {
    methods: {
        add() {
            data.push({ name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 });
        },
        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个后端请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        totalElements: 0,
                        content: [],
                    });
                }, 400);
            });
        },
    },
};
</script>