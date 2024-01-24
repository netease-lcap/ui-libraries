<!-- 基础示例 -->

<template>
  <div><u-for :data="[1,2,3]">
    <template slot-scope="{item, index}">
        <u-text display="block" :text="'序号:' + index + ', 值:' + item"> </u-text>
    </template>
</u-for></div>
</template>