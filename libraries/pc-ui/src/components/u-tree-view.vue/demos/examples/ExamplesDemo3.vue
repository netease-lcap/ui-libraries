<!-- 自定义模板 -->

<template>
  <div><u-tree-view :data="[
    { text: '文件夹1', type: 'directory', children: [
        { text: '文件夹1.1', type: 'directory' },
        { text: '文件夹1.2', type: 'directory', children: [
            { text: '文件1.2.1', type: 'file' },
            { text: '文件1.2.2', type: 'file' },
        ] },
        { text: '文件1.3', type: 'file' },
        { text: '文件1.4', type: 'file' },
    ] },
    { text: '文件夹2', type: 'directory' },
    { text: '文件夹3', type: 'directory', children: [
        { text: '文件3.1', type: 'file' },
        { text: '文件3.2', type: 'file' },
    ] },
]">
    <span slot="text" slot-scope="{ node, expanded, text }">
        {{ node.type === 'directory' ? (expanded ? '📂' : '📁') : '📄' }}
        {{ text }}
    </span>
</u-tree-view></div>
</template>