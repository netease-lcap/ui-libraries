<!-- 展开/折叠触发方式 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4" expand-trigger="click">
        <p>整行点击均可触发（默认）</p>
        <u-tree-view-new>
            <u-tree-view-node-new text="节点 1" expanded>
                <u-tree-view-node-new text="节点 1.1" expanded></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.2" expanded>
                    <u-tree-view-node-new text="节点 1.2.1"></u-tree-view-node-new>
                    <u-tree-view-node-new text="节点 1.2.2"></u-tree-view-node-new>
                </u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.3"></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.4"></u-tree-view-node-new>
            </u-tree-view-node-new>
            <u-tree-view-node-new text="节点 2"></u-tree-view-node-new>
            <u-tree-view-node-new text="节点 3">
                <u-tree-view-node-new text="节点 3.1"></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 3.2"></u-tree-view-node-new>
            </u-tree-view-node-new>
        </u-tree-view-new>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <p>仅点击小箭头时触发</p>
        <u-tree-view-new expand-trigger="click-expander">
            <u-tree-view-node-new text="节点 1" expanded>
                <u-tree-view-node-new text="节点 1.1" expanded></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.2" expanded>
                    <u-tree-view-node-new text="节点 1.2.1"></u-tree-view-node-new>
                    <u-tree-view-node-new text="节点 1.2.2"></u-tree-view-node-new>
                </u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.3"></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 1.4"></u-tree-view-node-new>
            </u-tree-view-node-new>
            <u-tree-view-node-new text="节点 2"></u-tree-view-node-new>
            <u-tree-view-node-new text="节点 3">
                <u-tree-view-node-new text="节点 3.1"></u-tree-view-node-new>
                <u-tree-view-node-new text="节点 3.2"></u-tree-view-node-new>
            </u-tree-view-node-new>
        </u-tree-view-new>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>