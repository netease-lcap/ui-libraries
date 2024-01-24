<!-- 范围约束模式 -->
<template>
<div>
    <div :class="$style.well">
        <f-dragger range="offset-parent" range-mode="inside">
            <u-block :class="$style.block" size="normal" color="primary" inline>object</u-block>
        </f-dragger>
    </div>
    <div :class="$style.well">
        <f-dragger range="offset-parent" range-mode="center">
            <u-block :class="$style.block" range-mode="center" size="normal" color="primary" inline>offset-parent</u-block>
        </f-dragger>
    </div>
</div>
</template>

<style module>
.well {
    display: inline-block;
    position: relative;
    vertical-align: bottom;
    width: 300px;
    height: 300px;
    padding: 20px;
    background: #f4f4f4;
    border: 2px solid #ccc;
}

.block {
    position: absolute;
}

.block[range-mode="center"] {
    margin-left: -32px;
    margin-top: -32px;
}
</style>