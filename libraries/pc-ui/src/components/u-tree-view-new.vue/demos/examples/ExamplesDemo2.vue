<!-- Data 方式 -->

<template>
  <div><u-tree-view-new :data-source="[
    { text: '节点 1', value: '1', children: [
        { text: '节点 1.1' , value: '1.1'},
        { text: '节点 1.2',value: '1.2', children: [
            { text: '节点 1.2.1', value: '1.2.1' },
            { text: '节点 1.2.2', value: '1.2.2' },
        ] },
        { text: '节点 1.3', value: '1.3', },
        { text: '节点 1.4', value: '1.4',},
    ] },
    { text: '节点 2', value: '2', },
    { text: '节点 3', value: '3', children: [
        { text: '节点 3.1', value: '3.1', },
        { text: '节点 3.2', value: '3.2', },
    ] },
]"></u-tree-view-new></div>
</template>