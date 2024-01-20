<!-- 自定义可扩展下拉项 -->
<template>
<u-linear-layout>
    <u-select v-model="value" :data-source="list" showRenderFooter ref="select">
        <template #renderFooter>
            <u-grid-layout>
                <u-grid-layout-row :repeat="24" alignment="center" gap="small">
                    <u-grid-layout-column :span="16">
                        <u-input placeholder="请输入" v-model="inputName"></u-input>
                    </u-grid-layout-column>
                    <u-grid-layout-column :span="8">
                        <u-button style="min-width:auto;width:100%;padding:0;" color="default" icon="add" text="添加" @click="onClick"></u-button>
                    </u-grid-layout-column>
                </u-grid-layout-row>
            </u-grid-layout>
        </template>
    </u-select>
    <u-select v-model="value" :data-source="load" showRenderFooter ref="select1" text-field="name" value-field="id" clearable>
        <template #renderFooter>
            <u-grid-layout>
                <u-grid-layout-row :repeat="24" alignment="center" gap="small">
                    <u-grid-layout-column :span="16">
                        <u-input placeholder="请输入" v-model="inputName1"></u-input>
                    </u-grid-layout-column>
                    <u-grid-layout-column :span="8">
                        <u-button style="min-width:auto;width:100%;padding:0;" color="default" icon="add" text="添加" @click="onClick1"></u-button>
                    </u-grid-layout-column>
                </u-grid-layout-row>
            </u-grid-layout>
        </template>
    </u-select>
</u-linear-layout>
</template>

<script>
// 模拟构造后端数据
const remoteData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ name: text, id: text }));

export default {
    data() {
        return {
            value: '',
            list: [
                { text: 'Java', value: 'java', description: '这是java'},
                { text: 'Python', value: 'python', description: '这是python'},
                { text: 'Node.js', value: 'nodejs', description: '这是nodejs' },
                { text: 'Go', value: 'go', description: '这是go' },
                { text: '.NET', value: '.net', description: '这是.net' },
                { text: 'PHP', value: 'php', description: '这是php' },
            ],
            inputName: '',
            inputName1: '',

        };
    },
    methods: {
        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData);
                }, 300);
            });
        },
        onClick() {
            const item = {text: this.inputName, value: this.inputName};
            this.$refs.select.addItem(item, 'first');
        },
        onClick1() {
            const item = {name:this.inputName1, id: this.inputName1};
            this.$refs.select1.addItem(item, 'last');
        },
    }
};
</script>