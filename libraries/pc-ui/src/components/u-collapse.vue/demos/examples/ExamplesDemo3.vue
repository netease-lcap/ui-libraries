<!-- 面板嵌套 -->

<template>
  <div><u-collapse>
    <u-collapse-item title="面板1">Content1</u-collapse-item>
    <u-collapse-item title="面板2" expanded>
        <u-collapse>
            <u-collapse-item title="面板1">Content1</u-collapse-item>
            <u-collapse-item title="面板2" expanded>Content2</u-collapse-item>
            <u-collapse-item title="面板3">Content3</u-collapse-item>
        </u-collapse>
    </u-collapse-item>
    <u-collapse-item title="面板3">Content3</u-collapse-item>
</u-collapse></div>
</template>