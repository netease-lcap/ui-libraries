<!-- 行列与表头合并 -->
<template>
<u-linear-layout direction="vertical">
    <u-text>静态列</u-text>
    <u-table-view line :data-source="data">
        <u-table-view-column type="checkbox" title="选择"></u-table-view-column>
        <u-table-view-column title="地址" field="address"></u-table-view-column>
        <u-table-view-column-group title="用户信息">
            <u-table-view-column title="用户名" field="name" :auto-row-span="true"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone"></u-table-view-column>
        </u-table-view-column-group>
        <!-- 测试空组过滤 -->
        <u-table-view-column-group title="用户信息"></u-table-view-column-group>
        <u-table-view-column-group title="用户信息2">
            <u-table-view-column title="用户名2" field="name" :auto-row-span="true"></u-table-view-column>
            <u-table-view-column title="手机号码2" field="phone"></u-table-view-column>
        </u-table-view-column-group>
        <u-table-view-column title="创建日期与登录日期表头合并" :col-span="2" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        <u-table-view-column field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        <u-table-view-column title="地址" field="address"></u-table-view-column>
    </u-table-view>
    <u-text>动态列</u-text>
    <u-table-view striped :data-source="data">
        <u-table-view-column type="checkbox" title="选择" width="8%"></u-table-view-column>
        <u-table-view-column title="用户名" field="name" width="12%"></u-table-view-column>
        <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
        <u-table-view-column-group title="分组">
            <u-table-view-column-dynamic :data-source="list">
                <div slot="title" slot-scope="{ columnItem }">
                    <u-text>{{ columnItem.name }}</u-text>
                </div>
                <div slot="cell" slot-scope="{ item, columnItem }">
                    <u-text>{{ item.name }} {{ columnItem.name }}</u-text>
                </div>
            </u-table-view-column-dynamic>
        </u-table-view-column-group>
        <u-table-view-column title="地址" field="address"></u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
    <u-text>动态列加载</u-text>
    <u-table-view striped :data-source="load">
        <u-table-view-column type="checkbox" title="选择" width="8%"></u-table-view-column>
        <u-table-view-column title="用户名" field="name" width="12%"></u-table-view-column>
        <u-table-view-column-dynamic :data-source="loadSubList">
            <div slot="title" slot-scope="{ columnItem }">
                <u-text>{{ columnItem.name }}</u-text>
            </div>
            <div slot="cell" slot-scope="{ item, columnItem }">
                <u-text>{{ item.name }} {{ columnItem.name }}</u-text>
            </div>
        </u-table-view-column-dynamic>
        <u-table-view-column-group title="用户信息">
            <u-table-view-column title="用户名" field="name" :auto-row-span="true"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone"></u-table-view-column>
        </u-table-view-column-group>
        <u-table-view-column title="地址" field="address"></u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
    </u-table-view>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            data: [
                { id: '07cdcb8ed5e94cec', name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
                { id: '5cd49be8f65c4738', colSpan: [[2, 2]], name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
                { id: 'f799a0467c494601', name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { id: '40e8ca488a1c4bce', disabled: true, rowSpan: [[1, 2]], name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { id: '150823cc351642b6', name: '李华', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
            ],
            list: [{name: '一月份', value: 'column1'}, {name: '二月份', value: 'column2'}, {name: '三月份', value: 'column3'}],
            count: 0,
        };
    },
    methods: {
        load() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.data.slice(0));
                }, 500);
            });
        },
        loadSubList() {
            this.count = this.count + 1;
            const data = [{name: `一月份${this.count}`, columnName:'one'}, {name: `二月份${this.count}`, columnName:'tow'}];
            if(this.count === 3) {
                data.push({name: `三月份${this.count}`, columnName:'three'});
            }
            if(this.count === 5) {
                data.push({name: `三月份${this.count}`, columnName:'three'});
                data.push({name: `四月份${this.count+1}`, columnName:'four'});
            }
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(data);
                }, 500);
            });
        },
    }
};
</script>