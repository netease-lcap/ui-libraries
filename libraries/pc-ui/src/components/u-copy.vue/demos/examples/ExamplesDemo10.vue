<!-- 指令形式 -->

<template>
  <div><u-linear-layout direction="vertical" style="min-width: 300px; max-width: 550px;">
    <u-linear-layout justify="center" gap="small">
        <u-button v-copy.top-start="'需要 copy 的内容'">上左</u-button>
        <u-button v-copy.top="'需要 copy 的内容'">上边</u-button>
        <u-button v-copy.top-end="'需要 copy 的内容'">上右</u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: left">
        <u-button v-copy.left-start="'需要 copy 的内容'">左上</u-button>
        <u-button v-copy.left="'需要 copy 的内容'">左边</u-button>
        <u-button v-copy.left-end="'需要 copy 的内容'">左下</u-button>
    </u-linear-layout>
    <u-linear-layout direction="vertical" justify="center" style="width: 150px; float: right">
        <u-button v-copy.right-start="'需要 copy 的内容'">右上</u-button>
        <u-button v-copy.right="'需要 copy 的内容'">右边</u-button>
        <u-button v-copy.right-end="'需要 copy 的内容'">右下</u-button>
    </u-linear-layout>
    <u-linear-layout justify="center" gap="small" style="clear: both">
        <u-button v-copy.bottom-start="'需要 copy 的内容'">下左</u-button>
        <u-button v-copy.bottom="'需要 copy 的内容'">下边</u-button>
        <u-button v-copy.bottom-end="'需要 copy 的内容'">下右</u-button>
    </u-linear-layout>
</u-linear-layout></div>
</template>