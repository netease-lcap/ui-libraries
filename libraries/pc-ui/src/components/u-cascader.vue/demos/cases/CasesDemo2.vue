<!-- 数据源开启搜索 -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-cascader
            ref="cascader"
            :data-source="load"
            :value.sync="value"
            filterable
            parent-field="entity1.parentid"
            value-field="entity1.id"
            field="entity1.property1"
        ></u-cascader>
        <u-button @click="onClickReload">click reload</u-button>
    </u-linear-layout>
</u-linear-layout>
</template>
<script>
// 模拟后端请求
const mockData = [
    { entity1:{property1:'理学', id: 1} },
    { entity1:{property1:'工学', id: 2} },
    { entity1:{property1:'物理学', id: 11, parentid: 1} },
    { entity1:{property1:'数学', id: 12, parentid: 1} },
    { entity1:{property1:'化学', id: 13, parentid: 1} },
    { entity1:{property1:'计算机科学与技术', id: 21, parentid: 2} },
    { entity1:{property1:'软件工程', id: 22, parentid: 2} },
    { entity1:{property1:'机械工程', id: 23, parentid: 2} },
];
const mockRequest = (name, timeout = 1000) => {
    return new Promise((res, rej) => setTimeout(() => res(mockData), timeout));
};

// 模拟数据服务
const mockService = {
    loadList() {
        // 在这里模拟了一个从后端一次性获取数据的请求
        return mockRequest();
    },
};
export default {
    data(){
        return {
            data: mockData,
            value: '工学 / 计算机科学与技术',
        }
    },
    methods: {
        load() {
            return mockService.loadList();
        },
        onClickReload() {
            console.log('reload');
            this.$refs.cascader.reload();
        }
    }
};
</script>