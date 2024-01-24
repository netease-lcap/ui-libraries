<!-- 调整大小 -->

<template>
  <div><u-split-layout resizable direction="vertical" style="width: 600px; height: 400px;">
    <u-split-layout-item size="25%" style="background: var(--background-color-base)">
        <u-panel title="Left"></u-panel>
    </u-split-layout-item>
    <u-split-layout-item size="25%" style="background: var(--background-color-base)">
        <u-panel title="Middle"></u-panel>
    </u-split-layout-item>
    <u-split-layout-item style="background: var(--background-color-base)">
        <u-panel title="Right">Some content</u-panel>
    </u-split-layout-item>
</u-split-layout></div>
</template>