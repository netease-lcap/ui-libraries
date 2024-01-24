<!-- 排序+调整列宽 -->
<template>
<u-table-view resizable striped :data="data" pageable :page-size="10"
    :filtering="{ address: '浙江省杭州市滨江区网商路599号网易大厦' }">
    <u-table-view-column sortable title="用户名" field="name" width="15%"></u-table-view-column>
    <u-table-view-column sortable title="手机号码" field="phone" width="20%"></u-table-view-column>
    <u-table-view-column title="地址" field="address" :filters="[
        { text: '全部' },
        { text: '网易大厦', value: '浙江省杭州市滨江区网商路599号网易大厦' },
        { text: '网易二期', value: '浙江省杭州市滨江区网商路599号网易大厦二期' },
        { text: '英飞特科技园', value: '浙江省杭州市滨江区江虹路459号英飞特科技园' },
        { text: '西可科技园', value: '浙江省杭州市滨江区秋溢路606号西可科技园' },
    ]"></u-table-view-column>
    <u-table-view-column sortable title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"
></u-table-view-column>
</u-table-view>
</template>
<script>
export default {
    data() {
        const baseData = [
            { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
            { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
            { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
            { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
            { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
        ];

        // 构造数量较多的 500 条数据
        const data = [];
        for (let i = 0; i < 75; i++) {
            const item = Object.assign({}, baseData[i % 5]);
            item.name += '-' + i;
            item.phone = String(+item.phone + i);
            item.createdTime += i * 1000 * 3600 * 24;
            item.loginTime += i * 1000 * 3600 * 24;
            data.push(item);
        }

        return { data };
    },
};
</script>