<!-- 基本用法 -->

<template>
  <div><u-list-components :data-source="[1,2,3,4,5]">
  <template #default="scope">
    <u-linear-layout vusion-disabled-copy vusion-disabled-cut>
        <u-button>Button</u-button>
    </u-linear-layout>
  </template>
</u-list-components></div>
</template>