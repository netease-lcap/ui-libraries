<!-- 节点显示/隐藏 -->

<template>
  <div><u-tree-view-new cancelable>
    <u-tree-view-node-new v-show="false" text="节点1">
        <u-tree-view-node-new text="节点1.1"></u-tree-view-node-new>
        <u-tree-view-node-new text="节点1.2">
            <u-tree-view-node-new text="节点1.2.1"></u-tree-view-node-new>
            <u-tree-view-node-new text="节点1.2.2"></u-tree-view-node-new>
        </u-tree-view-node-new>
        <u-tree-view-node-new text="节点1.3"></u-tree-view-node-new>
        <u-tree-view-node-new text="节点1.4"></u-tree-view-node-new>
    </u-tree-view-node-new>
    <u-tree-view-node-new text="节点2"></u-tree-view-node-new>
    <u-tree-view-node-new text="节点3">
        <u-tree-view-node-new text="节点3.1" hidden></u-tree-view-node-new>
        <u-tree-view-node-new text="节点3.2"></u-tree-view-node-new>
    </u-tree-view-node-new>
</u-tree-view-new></div>
</template>