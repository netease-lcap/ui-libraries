<!-- 指令形式 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-button v-tooltip.top-start="'Tooltip'">上左</u-button>
        <u-button v-tooltip.top="'Tooltip'">上边</u-button>
        <u-button v-tooltip.top-end="'Tooltip'">上右</u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left">
        <u-button v-tooltip.left-start="'Tooltip'">左上</u-button>
        <u-button v-tooltip.left="'Tooltip'">左边</u-button>
        <u-button v-tooltip.left-end="'Tooltip'">左下</u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right">
        <u-button v-tooltip.right-start="'Tooltip'">右上</u-button>
        <u-button v-tooltip.right="'Tooltip'">右边</u-button>
        <u-button v-tooltip.right-end="'Tooltip'">右下</u-button>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both">
        <u-button v-tooltip.bottom-start="'Tooltip'">下左</u-button>
        <u-button v-tooltip.bottom="'Tooltip'">下边</u-button>
        <u-button v-tooltip.bottom-end="'Tooltip'">下右</u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>