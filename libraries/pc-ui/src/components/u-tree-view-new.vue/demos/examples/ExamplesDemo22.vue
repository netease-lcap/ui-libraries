<!-- 统一操作 -->
<template>
<u-linear-layout direction="vertical">
    <u-tree-view-new ref="treeView" checkable :data-source="data"></u-tree-view-new>
    <u-linear-layout>
        <u-button @click="checkAll(true)">全部选中</u-button>
        <u-button @click="checkAll(false)">全部取消</u-button>
        <u-button @click="toggleAll(true)">全部展开</u-button>
        <u-button @click="toggleAll(false)">全部收起</u-button>
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
        checkAll(checked) {
            this.$refs.treeView.checkAll(checked);
        },
        toggleAll(expanded) {
            this.$refs.treeView.toggleAll(expanded);
        },
    },
};
</script>