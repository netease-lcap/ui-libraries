<!-- 基本用法 -->

<template>
  <div><u-modal ref="modal1" visible icon="success">
    <template #title>
        <div>自定义</div>
    </template>
    <template #body>
        <div>内容</div>
    </template>
    <template #foot>
        <u-linear-layout>
            <u-button color="primary">确定</u-button>
            <u-button>取消</u-button>
        </u-linear-layout>
    </template>
</u-modal></div>
</template>