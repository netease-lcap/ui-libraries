<!-- Tag 方式 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-tree-view readonly>
            <u-tree-view-node text="节点 1">
                <u-tree-view-node text="节点 1.1"></u-tree-view-node>
                <u-tree-view-node text="节点 1.2">
                    <u-tree-view-node text="节点 1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点 1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点 1.3"></u-tree-view-node>
                <u-tree-view-node text="节点 1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点 2"></u-tree-view-node>
            <u-tree-view-node text="节点 3">
                <u-tree-view-node text="节点 3.1"></u-tree-view-node>
                <u-tree-view-node text="节点 3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-tree-view disabled>
            <u-tree-view-node text="节点 1">
                <u-tree-view-node text="节点 1.1"></u-tree-view-node>
                <u-tree-view-node text="节点 1.2">
                    <u-tree-view-node text="节点 1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点 1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点 1.3"></u-tree-view-node>
                <u-tree-view-node text="节点 1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点 2"></u-tree-view-node>
            <u-tree-view-node text="节点 3">
                <u-tree-view-node text="节点 3.1"></u-tree-view-node>
                <u-tree-view-node text="节点 3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-tree-view>
            <u-tree-view-node text="节点 1">
                <u-tree-view-node text="节点 1.1"></u-tree-view-node>
                <u-tree-view-node text="节点 1.2" disabled>
                    <u-tree-view-node text="节点 1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点 1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点 1.3" disabled></u-tree-view-node>
                <u-tree-view-node text="节点 1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点 2" disabled></u-tree-view-node>
            <u-tree-view-node text="节点 3">
                <u-tree-view-node text="节点 3.1"></u-tree-view-node>
                <u-tree-view-node text="节点 3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>