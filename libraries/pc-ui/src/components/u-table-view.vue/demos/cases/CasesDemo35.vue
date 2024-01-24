<!-- 编辑行 -->
<template>
<u-linear-layout direction="vertical" gap="small">
    <u-table-view :data-source="data">
        <u-table-view-column title="用户名" width="20%">
            <div slot="cell" slot-scope="{ item, index }">
                <u-validator v-if="item.adding" label="用户名"  rules="required" placement="bottom" :ref="`name_${index}`">
                    <u-input v-model="item.name" :autofocus="true" maxlength="12" width="full"></u-input>
                </u-validator>
                <div v-else>{{ item.name }}</div>
            </div>
        </u-table-view-column>
        <u-table-view-column title="手机号码" width="20%">
            <div slot="cell" slot-scope="{ item, index }">
                <u-validator v-if="item.adding || item.editing" label="手机号码" rules="required | phone" placement="bottom" :ref="`phone_${index}`">
                    <u-input v-model="item.phone" :autofocus="item.editing" width="full"></u-input>
                </u-validator>
                <div v-else>{{ item.phone }}</div>
            </div>
        </u-table-view-column>
        <u-table-view-column title="邮箱">
            <div slot="cell" slot-scope="{ item, index }">
                <u-validator key="aaa" v-if="item.adding || item.editing" label="邮箱" rules="required | email" placement="bottom" :ref="`email_${index}`">
                    <u-select :data-source="loadSelect" key="ssss"></u-select>
                </u-validator>
                <div v-else>{{ item.email }}</div>
            </div>
        </u-table-view-column>
        <u-table-view-column title="最近登录时间" field="loginTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        <u-table-view-column title="操作" width="120">
            <div slot="cell" slot-scope="{ item }">
                <u-linear-layout gap="small">
                    <template v-if="item.adding || item.editing">
                        <u-link @click="onClickConfirm(item)">确定</u-link>
                        <u-link @click="onClickCancel(item)">取消</u-link>
                    </template>
                    <template v-else>
                        <u-link @click="onClickEdit(item)">编辑</u-link>
                        <u-link @click="onClickDelete(item)">删除</u-link>
                    </template>
                </u-linear-layout>
            </div>
        </u-table-view-column>
    </u-table-view>
    <u-linear-layout justify="end">
        <div style="width: 120px;"><u-button color="primary" size="small" @click="add()">添加数据</u-button></div>
    </u-linear-layout>
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
            count: 0,
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
        onClickEdit(item) {
            item.editing = true;
            item.tempData = Object.assign({}, item);
        },
        onClickCancel(item) {
            if (item.adding) {
                this.data.splice(0, 1);
            } else {
                Object.assign(item, item.tempData);
                item.editing = false;
            }
        },
        onClickConfirm(item) {
            const tasks = [];
            const index = this.data.findIndex((temp) => temp.name === item.name);
            Object.keys(item).forEach((key) => {
                const node = this.$refs[`${key}_${index}`];
                if(node){
                    tasks.push(node.validate());
                }
            });
            Promise.all(tasks).then((results) => {
                if (results.every((result) => result.valid)) {
                    if(item.adding) {
                        this.onAdd(item);
                    } else {
                        this.onEdit(item);
                    }
                }
            });
        },
        onClickDelete(item) {
            const index = this.data.findIndex((temp)=>temp.id === item.id);
            this.data.splice(index, 1);
        },
        add(){
            if(!this.data || this.data[0] && this.data[0].adding)
                return;
            this.data.push({
                adding: true,
                name: '',
                phone:'',
                email:''
            });
        },
        onAdd(item){
            item.adding = false;
        },
        onEdit(item){
            item.editing = false;
        },
        loadSelect() {
            console.log('select load');
            this.count = this.count + 1;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([{text: `姓名${this.count}`, value: 'name'}, {text: '省份', value: 'province'}]);
                }, 500);
            });
        }
    }
};
</script>