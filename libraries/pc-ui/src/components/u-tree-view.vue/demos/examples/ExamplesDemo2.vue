<!-- Data 方式 -->

<template>
  <div><u-tree-view :data="[
    { text: '节点 1', children: [
        { text: '节点 1.1' },
        { text: '节点 1.2', children: [
            { text: '节点 1.2.1' },
            { text: '节点 1.2.2' },
        ] },
        { text: '节点 1.3' },
        { text: '节点 1.4' },
    ] },
    { text: '节点 2' },
    { text: '节点 3', children: [
        { text: '节点 3.1' },
        { text: '节点 3.2' },
    ] },
]"></u-tree-view></div>
</template>