<!-- 动态数据渲染 -->
<template>
    <div>
        <u-tabs :value.sync="value"
                :dataSource="tabList"
                titleField="title"
                valueField="value"
                contentField="contentUrl"
                closableField="closable"
                showScrollButtons='auto'
                router>
        </u-tabs>
        <u-button size="small" slot="extra" @click="addValue">value+1</u-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 1,
            tabList: [{
                title: '标签页 1',
                value: '1',
                contentUrl: '/components/u-tabs',
                closable: true,
            }, {
                title: '标签页 2',
                value: '2',
                contentUrl: '/components/u-tabs#路由',
                closable: false,
            }, {
                title: '标签页 3',
                value: '3',
                contentUrl: '/components/u-tabs#默认显示和可关闭',
                closable: true,
            }]
        };
    },
    methods: {
        addTab() {
            this.tabList.push({
                title: '标签页',
                value: this.tabList.length + 1,
                contentUrl: '/components/u-tabs',
                closable: true,
            });
        },
        addValue() {
            this.value = this.value + 1;
        },
    },
};
</script>