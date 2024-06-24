<!-- 编辑行-new -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-table-view :data-source="data" :default-column-width="200">
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
                { id: '07cdcb8ed5e94cec', name: '张三', phone: '18612917895', email: 'zhangsan@163.com', createdTime: 1464421931000, loginTime: 1527515531000 },
                { id: '5cd49be8f65c4738', name: '小明', phone: '13727160283', email: 'xiaoming@163.com', createdTime: 1520864676000, loginTime: 1552400676000 },
                { id: 'f799a0467c494601', name: '李四', phone: '18897127809', email: 'lisi@163.com', createdTime: 1494488730000, loginTime: 1558165530000 },
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