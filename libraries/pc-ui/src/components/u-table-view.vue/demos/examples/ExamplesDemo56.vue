<!-- 两个表格拖拽 -->
<template>
<u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="6">
            <u-table-view :data-source="load1" value-field="name" :can-dragable-handler="canDrag" across-table-drag @drop="onDrop1" ref="tableview1">
                <u-table-view-column type="checkbox" width="30"></u-table-view-column>
                <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
                <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
                <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column ellipsis>
                <template #dragGhost="{item}">
                    <div style="padding:15px;background:white;border:1px solid #ddd; width:100px;">{{item && item.name}}</div>
                </template>
            </u-table-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="6">
            <u-table-view :data-source="load2" value-field="name" :can-dragable-handler="canDrag"  across-table-drag @drop="onDrop2" ref="tableview2">
                <u-table-view-column title="用户名" field="name" width="20%"></u-table-view-column>
                <u-table-view-column title="手机号码" field="phone" width="20%" ellipsis></u-table-view-column>
                <u-table-view-column title="地址" field="address" ellipsis></u-table-view-column>
                <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column ellipsis>
                <template #dragGhost="{item}">
                    <div style="padding:15px;background:white;border:1px solid #ddd; width:100px;">{{item && item.name}}</div>
                </template>
            </u-table-view>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
</template>
<script>
const list1 = [
    { name: '张三1', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
    { name: '张三dd1', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
    { name: '小明1', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 , dropDisabled:true},
    { name: '李四1', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
    { name: '李华1', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
    { name: '王五1', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
];
const list2 = [
    { name: '张三2', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
    { name: '张三dd2', phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
    { name: '小明2', phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 , dropDisabled:true},
    { name: '李四2', phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
    { name: '李华2', phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
    { name: '王五2', phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
];
export default {
    data(){
        return {
        }
    },
    methods: {
        load1() {
            return list1;
        },
        load2() {
            return list2;
        },
        canDrag(item) {
            return item && item.name !== '李四'
        },
        onDrop1(event) {
            console.log('onDrop1', event);
            list1.unshift(event.source.item);
            this.$refs.tableview1.reload();
            const deleteIndex = list2.find((item)=>item.name === event.source.item.name);
            list2.splice(deleteIndex, 1);
            this.$refs.tableview2.reload();
        },
        onDrop2(event) {
            console.log('drop2', event);
            list2.unshift(event.source.item);
            this.$refs.tableview2.reload();
            const deleteIndex = list1.find((item)=>item.name === event.source.item.name);
            list1.splice(deleteIndex, 1);
            this.$refs.tableview1.reload();
        }
    },
};
</script>