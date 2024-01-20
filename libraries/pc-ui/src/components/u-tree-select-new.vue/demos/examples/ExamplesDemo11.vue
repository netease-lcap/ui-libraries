<!-- 动静结合选项回填 -->

<template>
  <div><u-tree-select-new ref="tree_select_new3" placeholder="请选择">
    <template #item="scope" ref="template4"></template>
    <u-tree-view-node-new ref="tree_view_node_new1" text="水果" :value="1">
        <template #item ref="template5">
            <u-text ref="text6" text="水果"></u-text>
        </template>
        <u-tree-view-node-new ref="tree_view_node_new2" text="苹果" :value="2">
            <template #item ref="template6">
                <u-text ref="text7" text="平果"></u-text>
            </template>
            <u-tree-view-node-new ref="tree_view_node_new4" text="无核" :value="3">
                <template #item ref="template8">
                    <u-text ref="text9" text="无核"></u-text>
                </template>
            </u-tree-view-node-new>
        </u-tree-view-node-new>
    </u-tree-view-node-new>
    <u-tree-view-node-new ref="tree_view_node_new3" text="电器" :value="1">
        <template #item ref="template7">
            <u-text ref="text8" text="电器"></u-text>
        </template>
    </u-tree-view-node-new>
</u-tree-select-new></div>
</template>