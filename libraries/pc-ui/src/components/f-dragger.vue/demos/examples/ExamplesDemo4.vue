<!-- 范围约束 -->
<template>
<div>
    <div :class="$style.well">
        <f-dragger :range="{ left: 0, top: 0, right: 200, bottom: 200 }">
            <u-block :class="$style.block" size="normal" color="primary" inline>object</u-block>
        </f-dragger>
    </div>
    <div :class="$style.well">
        <f-dragger range="offset-parent">
            <u-block :class="$style.block" size="normal" color="primary" inline>offset-parent</u-block>
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
</style>