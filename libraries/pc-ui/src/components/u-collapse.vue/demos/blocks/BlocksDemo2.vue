<!-- 额外插槽 -->

<template>
  <u-collapse showExtraEmptySlot>
    <u-collapse-item><template #title><u-text text="面板1"></u-text></template><template #extra><u-link>设置</u-link></template>Content1</u-collapse-item>
    <u-collapse-item expanded><template #title><u-text text="面板2"></u-text></template><template #extra></template>Content2</u-collapse-item>
    <u-collapse-item><template #title><u-text text="面板3"></u-text></template><template #extra></template>Content3</u-collapse-item>
</u-collapse>
</template>