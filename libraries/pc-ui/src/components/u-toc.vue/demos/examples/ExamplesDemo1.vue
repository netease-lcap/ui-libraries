<!-- 基本用法 -->

<template>
  <div><u-toc>
    <u-toc-item label="锚点跳转1" :disabled=true hrefAndTo="/#/components/u-toc/examples" anchorLinked="锚点1" value="锚点value1"></u-toc-item>
    <u-toc-item label="锚点其它页面" hrefAndTo="/#/components/u-anchor/examples" anchorLinked="锚点2" value="锚点value2"></u-toc-item>
    <u-toc-item label="锚点本页面" hrefAndTo="/#/components/u-toc/examples" anchorLinked="锚点1" value="锚点value1"></u-toc-item>
    <u-toc-item label="基础示例" to="examples">
        <u-toc-item label="value" :to="{ path: 'examples', hash: '#value' }"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UToc API" :to="{ path: 'api', hash: '#api' }">
        <u-toc-item label="Props/Attrs" :to="{ path: 'api', hash: '#propsattrs' }"></u-toc-item>
        <u-toc-item label="Slots" :to="{ path: 'api', hash: '#slots' }"></u-toc-item>
        <u-toc-item label="Events" :to="{ path: 'api', hash: '#events' }"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UTocItem API" :to="{ path: 'api', hash: '#api' }">
        <u-toc-item label="Props/Attrs" :to="{ path: 'api', hash: '#propsattrs' }"></u-toc-item>
        <u-toc-item label="Slots" :to="{ path: 'api', hash: '#slots' }"></u-toc-item>
        <u-toc-item label="Events" :to="{ path: 'api', hash: '#events' }"></u-toc-item>
    </u-toc-item>
</u-toc></div>
</template>