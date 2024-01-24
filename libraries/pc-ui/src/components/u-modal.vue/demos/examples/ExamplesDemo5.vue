<!-- 图标、小标题与描述 -->

<template>
  <div><u-modal title="删除" content="确定删除该服务吗？" icon="warning" visible static>
    <template #description>
        <span>删除后不可恢复。</span>
    </template>
</u-modal>
<u-modal title="创建" content="创建成功!" icon="success" visible static></u-modal>
<u-modal title="创建" content="创建失败!" icon="error" visible static></u-modal></div>
</template>