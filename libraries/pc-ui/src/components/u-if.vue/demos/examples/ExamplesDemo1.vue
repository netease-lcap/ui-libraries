<!-- 基础示例 -->

<template>
  <div><u-if :check="true">
    <template #True>
        <u-text text="成功"></u-text>
    </template>
    <template #False>
        <u-text text="失败"></u-text>
    </template>
</u-if></div>
</template>