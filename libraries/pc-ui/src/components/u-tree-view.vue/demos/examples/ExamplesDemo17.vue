<!-- 多选 -->
<template>
<u-tree-view ref="treeView" check-controlled checkable :values.sync="values" :data="data"></u-tree-view>
</template>
<script>
export default {
    data() {
        return {
            values: ['1', '1.2', '1.2.1', '1.2.2'],
            data: [
                { text: '节点 1', value: '1', expanded: true, checked: false, children: [
                    { text: '节点 1.1', value: '1.1', expanded: false, checked: false },
                    { text: '节点 1.2', value: '1.2', expanded: true, checked: false, children: [
                        { text: '节点 1.2.1', value: '1.2.1', expanded: false, checked: false },
                        { text: '节点 1.2.2', value: '1.2.2', expanded: false, checked: false },
                    ] },
                    { text: '节点 1.3', value: '1.3', expanded: false, checked: false },
                    { text: '节点 1.4', value: '1.4', expanded: false, checked: false },
                ] },
                { text: '节点 2', value: '2', expanded: false, checked: false },
                { text: '节点 3', value: '3', expanded: false, checked: false },
            ],
        };
    },
};
</script>