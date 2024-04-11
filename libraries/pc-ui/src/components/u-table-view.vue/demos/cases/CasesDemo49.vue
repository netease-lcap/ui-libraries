<!-- 树形数据编辑行 -->

<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-table-view :data-source="data" tree-display>
            <u-table-view-column title="用户名" field="name" type="editable" fixed>
                <template #editcell="scope">
                    <u-validator style="width:100%" placement="bottom" display="appear" append-to="body" @blur-valid="validator1_blurvalid($event, scope)" rules="required">
                        <u-input :value.sync="scope.item.name" placeholder="请输入用户名" :autofocus="true" width="full"></u-input>
                    </u-validator>
                </template>
                <template #cell="scope">
                    <u-text>{{scope.item.name}}</u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" fixed></u-table-view-column>
            <u-table-view-column  title="手机号码" field="phone" type="editable">
                <template #editcell="scope">
                    <u-validator style="width:100%" placement="bottom" display="appear" append-to="body" @blur-valid="validator2_blurvalid($event, scope)" rules="required | phone">
                        <u-input :value.sync="scope.item.phone" placeholder="请输入手机号" :autofocus="true" width="full"></u-input>
                    </u-validator>
                </template>
                <template #cell="scope">
                    <u-text>{{scope.item.phone}}</u-text>
                </template>
            </u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date"></u-table-view-column>
            <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date"></u-table-view-column>
            <u-table-view-column title="操作" fixed>
                <template #cell="scope">
                    <u-link text="删除"></u-link>
                </template>
            </u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</template>
<script>
export default {
    rules: {
        phone: { validate: 'pattern', args: /^\d{11}$/, message: '手机号码格式不正确', trigger: 'blur' },
    },
    data(){
        return {
            data: undefined,
            isValid: false,
        }
    },
    created(){
        this.load();
    },
    methods: {
        getData(){
            return Promise.resolve([
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
            ]);
        },
        load() {
            return this.getData().then((res)=>{
                res.forEach((item)=>{
                    // 需要先赋值editing，后续更改editing才会响应
                    item.editing = false;
                });
                this.data = res;
            });
        },
        validator1_blurvalid(event, scope) {
            scope.item.editing = '';
        },
        validator2_blurvalid(event, scope) {
            scope.item.editing = '';
        },
    }
};
</script>