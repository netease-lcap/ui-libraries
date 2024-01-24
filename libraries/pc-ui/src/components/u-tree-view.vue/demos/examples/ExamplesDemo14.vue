<!-- 节点显示/隐藏 -->

<template>
  <div><u-tree-view cancelable>
    <u-tree-view-node v-show="false" text="节点1">
        <u-tree-view-node text="节点1.1"></u-tree-view-node>
        <u-tree-view-node text="节点1.2">
            <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.3"></u-tree-view-node>
        <u-tree-view-node text="节点1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点2"></u-tree-view-node>
    <u-tree-view-node text="节点3">
        <u-tree-view-node text="节点3.1" hidden></u-tree-view-node>
        <u-tree-view-node text="节点3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view></div>
</template>