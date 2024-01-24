<!-- 复杂定位问题 -->

<template>
  <div><u-linear-layout>
    <span>
        Span
        <u-tooltip>Span</u-tooltip>
    </span>
    <u-button>
        Button
        <u-tooltip>Button</u-tooltip>
    </u-button>
    <u-button>
        Button
        <span>
            test
            <u-tooltip>Button</u-tooltip>
        </span>
    </u-button>
    <u-select>
        <u-select-item>苹果</u-select-item>
        <u-select-item>香蕉</u-select-item>
        <u-select-item>蛋糕<u-tooltip>SelectItem</u-tooltip></u-select-item>
        <u-tooltip>Select</u-tooltip>
        <div>test <u-tooltip>Select</u-tooltip></div>
    </u-select>
    <input v-tooltip="'Input'">
    <u-button>Button</u-button>
    <u-tooltip reference="prev">Button Prev</u-tooltip>
    <u-tooltip reference="next">Button Next</u-tooltip>
    <u-button>Button</u-button>
</u-linear-layout></div>
</template>