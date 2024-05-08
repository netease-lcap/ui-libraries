<!-- 树型展示 -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout direction="vertical">
        <u-table-view :data-source="list" tree-display ref="tableView">
            <u-table-view-column type="checkbox" width="30"></u-table-view-column>
            <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
            <u-table-view-column title="地址" field="address"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
        <u-button @click="add" color="primary">添加子数据</u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical">
        <u-table-view :data-source="list1" tree-display ref="tableView1" parentField="parentId" valueField="name" pagination>
            <u-table-view-column type="checkbox" width="30"></u-table-view-column>
            <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
            <u-table-view-column title="地址" field="address"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
        <u-linear-layout>
            <u-button @click="add1" color="primary">添加子数据</u-button>
            <u-button @click="add2" color="primary">添加第二层子数据</u-button>
        </u-linear-layout>
    </u-linear-layout>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-button @click="loadList2" color="primary">加载数据</u-button>
        </u-linear-layout>
        <u-table-view :data-source="list2" tree-display ref="tableView1" parentField="parentId" valueField="name" pagination>
            <u-table-view-column type="checkbox" width="30"></u-table-view-column>
            <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
            <u-table-view-column title="地址" field="address"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
    </u-linear-layout>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            <u-text>数据源为变量分页</u-text>
        </u-linear-layout>
        <u-table-view :data-source="list3" tree-display ref="tableView1" parentField="parentId" valueField="name" pagination :pageSize="10">
            <u-table-view-column type="checkbox" width="30"></u-table-view-column>
            <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
            <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
            <u-table-view-column title="地址" field="address"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
export default {
    data(){
        return {
            list: this.getList(),
            list1: [
                { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, parentId: undefined },
                { name: '张三11', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, parentId: '张三'}
            ],
            list2: {
                list: [],
                total: 0,
            },
            list3: this.getList3(),
        }
    },
    methods: {
        add() {
            this.list[1].expanded = true;
            this.list[1].children.push({ name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 });
        },
        refresh() {
            this.list = this.getList();
        },
        getList() {
            return [
                { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                { name: '张三dd', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, treeExpanded:true, children:[
                    { name: '张三11', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                    { name: '张三12', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000,children:[
                    { name: '张三121', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                    { name: '张三122', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                ]},
                ]},
                { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 , dropDisabled:true},
                { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
            ]
        },
        add1() {
            const name = '小明' + (new Date().getTime());
            const item = { name: name, phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000, parentId: '张三' };
            this.list1.push(item);
        },
        add2() {
            const name = '李四' + (new Date().getTime());
            const item = { name: name, phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000,  parentId: '张三11' };
            this.list1.push(item);
        },
        loadList2() {
            console.log('loadList2');
            this.list2 = {
                list: [
                    { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, parentId: undefined },
                    { name: '张三11', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000, parentId: '张三'}
                ],
                total: 2,
            }
        },
        getList3() {
            const baseData = [
                { name: '张三', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000 },
                { name: '小明', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 },
                { name: '李四', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { name: '李华', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { name: '王五', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
            ];

            // 构造数量较多的 500 条数据
            const data = [];
            for (let i = 0; i < 30; i++) {
                const item = Object.assign({}, baseData[i % 5]);
                item.name += '-' + i;
                item.phone = String(+item.phone + i);
                item.createdTime += i * 1000 * 3600 * 24;
                item.loginTime += i * 1000 * 3600 * 24;
                data.push(item);
            }
            return data;
        }
    },
};
</script>