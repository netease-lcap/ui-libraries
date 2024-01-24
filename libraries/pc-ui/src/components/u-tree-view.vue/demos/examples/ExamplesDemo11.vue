<!-- 手风琴 -->

<template>
  <div><u-tree-view accordion>
    <u-tree-view-node text="节点 1">
        <u-tree-view-node text="节点 1.1">
            <u-tree-view-node text="节点 1.1.1"></u-tree-view-node>
            <u-tree-view-node text="节点 1.1.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点 1.2">
            <u-tree-view-node text="节点 1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点 1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点 1.3">
            <u-tree-view-node text="节点 1.3.1"></u-tree-view-node>
            <u-tree-view-node text="节点 1.3.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点 1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点 2" expanded>
        <u-tree-view-node text="节点 2.1"></u-tree-view-node>
        <u-tree-view-node text="节点 2.2"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点 3">
        <u-tree-view-node text="节点 3.1"></u-tree-view-node>
        <u-tree-view-node text="节点 3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view></div>
</template>