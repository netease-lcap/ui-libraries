<!-- 树型展示，点击选中 -->
<template>
<u-table-view :data-source="load" tree-display checkable @select="onSelect" selectable @tree-toggle-expanded="onToggle">
    <u-table-view-column type="checkbox" width="30"></u-table-view-column>
    <u-table-view-column title="用户名" field="name" width="20%" ellipsis></u-table-view-column>
    <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
    <u-table-view-column title="地址" field="address"></u-table-view-column>
    <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
</u-table-view>
</template>
<script>
// 模拟后端请求
const mockRequest = (name, timeout = 1000) => {
    const mockData = [
            { name: '张三1'+name, phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, hasChildren: true },
            { name: '小明1'+name, phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
            { name: '李四1'+name, phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
            { name: '李华1'+name, phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
            { name: '王五1'+name, phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
        ];
    return new Promise((res, rej) => setTimeout(() => res(mockData), timeout));
};

// 模拟数据服务
const mockService = {
    loadList(name) {
        // 在这里模拟了一个从后端一次性获取数据的请求
        return mockRequest(name);
    },
};

export default {
    methods: {
        load(params, itemData) {
            const name = itemData&&itemData.item?itemData.item.name : '';
            return mockService.loadList(name);
        },
        onSelect() {
            console.log('select');
        },
        onToggle(e, t) {
            console.log(e, t);
        }
    },
};
</script>