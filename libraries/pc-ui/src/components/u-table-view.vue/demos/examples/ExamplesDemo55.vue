<!-- 两个表格拖拽 -->
<template>
<u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="6">
            <u-table-view :data-source="list1" :draggable="true" value-field="name" :can-dragable-handler="canDrag" across-table-drag @drop="onDrop1" ref="tableview1">
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
            <u-table-view :data-source="list2" :draggable="true" value-field="name" :can-dragable-handler="canDrag"  across-table-drag @drop="onDrop2" ref="tableview2">
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
export default {
    data(){
        return {
            list1: this.getList(1),
            list2: this.getList(2),
            dragStartNode1: undefined,
            dragStartNode2: undefined,
        }
    },
    methods: {
        getList(index) {
            return [
                { name: '张三' + index, phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                { name: '张三dd' + index, phone: '18612917895', email: 'zhangsan@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦', createdTime: 1464421931000, loginTime: 1527515531000},
                { name: '小明' + index, phone: '13727160283', email: 'xiaoming@163.com', address: '浙江省杭州市滨江区江虹路459号英飞特科技园', createdTime: 1520864676000, loginTime: 1552400676000 , dropDisabled:true},
                { name: '李四' + index, phone: '18897127809', email: 'lisi@163.com', address: '浙江省杭州市滨江区秋溢路606号西可科技园', createdTime: 1494488730000, loginTime: 1558165530000 },
                { name: '李华' + index, phone: '18749261214', email: 'lihua@163.com', address: '浙江省杭州市滨江区长河路590号东忠科技园', createdTime: 1476073921000, loginTime: 1544428081000 },
                { name: '王五' + index, phone: '13579340020', email: 'wangwu@163.com', address: '浙江省杭州市滨江区网商路599号网易大厦二期', createdTime: 1468614726000, loginTime: 1531675926000 },
            ]
        },
        canDrag(item) {
            return item && item.name !== '李四1'
        },
        onDrop1(event) {
            console.log('onDrop1', event);
            if(event.finalSource) {
                this.list1.splice(event.source.index, 1);
                this.list1.splice(event.target.index, 0, event.source.item);
            } else {
                const insertIndex = event.position === 'insertBefore' ? event.target.index : event.target.index + 1;
                this.list1.splice(insertIndex, 0, event.source.item);
                this.list2.splice(event.source.index, 1);
            }
        },
        onDrop2(event) {
            console.log('onDrop2', event);
            if(event.finalSource) {
                this.list2.splice(event.source.index, 1);
                this.list2.splice(event.target.index, 0, event.source.item);
            } else {
                if (event.position === 'append') {
                    this.list2.push(event.source.item);
                    this.list1.splice(event.source.index, 1);
                } else {
                    const insertIndex = event.position === 'insertBefore' ? event.target.index : event.target.index + 1;
                    this.list2.splice(insertIndex, 0, event.source.item);
                    this.list1.splice(event.source.index, 1);
                }
            }
        }
    },
};
</script>