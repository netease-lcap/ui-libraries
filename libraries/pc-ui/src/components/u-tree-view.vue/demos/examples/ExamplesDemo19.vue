<!-- 遍历和查找 -->
<template>
<u-linear-layout direction="vertical">
    <u-tree-view ref="treeView" :data="data"></u-tree-view>
    <u-linear-layout>
        <u-button @click="walk()">遍历所有节点</u-button>
        <u-button @click="find()">查找末尾为`4`的节点</u-button>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            data: [
                { text: '节点 1', expanded: true, checked: false, children: [
                    { text: '节点 1.1', expanded: false, checked: false },
                    { text: '节点 1.2', expanded: true, checked: false, disabled: true, children: [
                        { text: '节点 1.2.1', expanded: false, checked: false },
                        { text: '节点 1.2.2', expanded: false, checked: false },
                    ] },
                    { text: '节点 1.3', expanded: false, checked: false },
                    { text: '节点 1.4', expanded: false, checked: false },
                ] },
                { text: '节点 2', expanded: false, checked: false },
                { text: '节点 3', expanded: false, checked: false },
            ],
        };
    },
    methods: {
        walk() {
            // 注意：如果有返回值，遍历会终止。
            this.$refs.treeView.walk((nodeVM) => console.info(nodeVM.text));
        },
        find() {
            const nodeVM = this.$refs.treeView.find((nodeVM) => nodeVM.text.endsWith('4'));
            alert(nodeVM.text);
        },
    },
};
</script>