<!-- 树型展示 -->
<template>
<u-linear-layout direction="vertical">
<u-linear-layout>
    <u-text>数据选中类型：</u-text>
    <u-select v-model="checkType" @change="refresh()">
        <u-select-item value="up+down">父子双向关联选中（父选中子选中，子全选父也选中）</u-select-item>
        <u-select-item value="down">单项父关联子（父选中子选中，子全选父不选中）</u-select-item>
        <u-select-item value="up">单项子关联父（父选中子不选中，子全选中父选中）</u-select-item>
        <u-select-item value="none">父子不关联（父选中子不选中，子全选父不选中）</u-select-item>
    </u-select>
</u-linear-layout>
<u-table-view :data-source="list" tree-display :treeCheckType="checkType" ref="tableView" :values.sync="checkedValues" valueField="name">
    <u-table-view-column type="checkbox" width="30"></u-table-view-column>
    <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
    <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
    <u-table-view-column title="地址" field="address"></u-table-view-column>
    <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
</u-table-view>
<u-button @click="add" color="primary">添加子数据</u-button>
<u-text>{{ checkedValues }}</u-text>
</u-linear-layout>
</template>
<script>
export default {
    data(){
        return {
            list: this.getList(),
            checkType: 'up+down',
            checkedValues: [],
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
        }
    },
};
</script>