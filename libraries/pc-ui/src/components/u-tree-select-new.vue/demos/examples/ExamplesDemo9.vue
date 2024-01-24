<!-- 动态插槽数据 -->

<template>
  <div><u-tree-select-new valueField="value" textField="text" childrenField="children" :data-source="[
    { text: '节点 1',value: '1', children: [
        { text: '节点 1.1', value: '1.1' },
        { text: '节点 1.2', value: '1.2', children: [
            { text: '节点 1.2.1', value: '1.2.1' },
            { text: '节点 1.2.2', value: '1.2.2' },
        ] },
        { text: '节点 1.3', value: '1.3' },
        { text: '节点 1.4', value: '1.4', },
    ] },
    { text: '节点 2', value: '2' },
    { text: '节点 3', value: '3',children: [
        { text: '节点 3.1', value: '3.1'},
        { text: '节点 3.2', value: '3.2'},
    ] },
]">
    <template #item="scope">
        <u-text>{{ scope.item.text }} - {{ scope.item.value}}</u-text> 
    </template>
    <u-tree-view-node-new ref="tree_view_node_new11" text="选项一" value="jing1">
        <template #item ref="template18">
            <u-text ref="text18" text="选项1"></u-text>
        </template>
    </u-tree-view-node-new>
    <u-tree-view-node-new ref="tree_view_node_new12" text="选项2" value="jing2">
        <template #item ref="template19">
            <u-text ref="text19" text="选项2"></u-text>
        </template>
    </u-tree-view-node-new>
</u-tree-select-new></div>
</template>