<!-- 指令形式 -->

<template>
  <div><u-linear-layout>
    <u-button v-tooltip="'Tooltip'">hover（默认）</u-button>
    <u-button v-tooltip.click="'Tooltip'">click</u-button>
    <u-button v-tooltip.right-click="'Tooltip'">right-click</u-button>
    <u-button v-tooltip.double-click="'Tooltip'">double-click</u-button>
</u-linear-layout></div>
</template>