<template>
<div>
    <div style="margin: 0 0 5px 0">水平排列</div>
    <u-radios value="开">
        <u-radio label="关">关</u-radio>
        <u-radio label="开">开</u-radio>
    </u-radios>

    <div style="margin: 24px 0 5px 0">垂直排列</div>
    <u-radios value="开" direction="vertical" >
        <u-radio label="关" disabled>关_禁用</u-radio>
        <u-radio label="开" disabled>开_禁用</u-radio>
    </u-radios>
</div>
</template>
