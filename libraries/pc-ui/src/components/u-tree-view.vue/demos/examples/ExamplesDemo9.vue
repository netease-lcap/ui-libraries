<!-- Tag 和 Data 混合 -->
<template>
<u-tree-view :data-source="load" text-field="title">
    <u-tree-view-node v-for="app in apps" v-if="app.subType !== 'other'" :text="app.title" :node="app" children-field="services"></u-tree-view-node>
</u-tree-view>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));

export default {
    data() {
        return {
            apps: [
                { type: 'app', title: '应用1' },
                { type: 'app', title: '应用2' },
                { type: 'app', title: '应用3', subType: 'other' },
                { type: 'app', title: '应用4' },
            ],
        };
    },
    methods: {
        load(params) {
            if (params.node.type === 'app') {
                return mockRequest([
                    { type: 'service', title: '服务1', childrenField: 'pages' },
                    { type: 'service', title: '服务2', childrenField: 'pages' },
                    { type: 'service', title: '服务3', childrenField: 'pages' },
                ]);
            } else if (params.node.type === 'service') {
                return mockRequest([
                    { type: 'page', title: '页面1' },
                    { type: 'page', title: '页面2' },
                ]);
            } else {
                return mockRequest();
            }
        },
    },
}
</script>