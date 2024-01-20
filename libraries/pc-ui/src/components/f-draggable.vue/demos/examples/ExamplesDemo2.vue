<!-- 移动自身 -->

<template>
  <div><f-draggable transfer="self">
    <u-block size="normal" color="primary" style="position: relative;">static</u-block>
</f-draggable>
<div style="width: 200px; height: 200px; border: 1px solid #ccc; position: relative; overflow: auto; margin: 10px 0;">
<f-draggable transfer="self">
    <u-block size="normal" color="primary" style="position: absolute; top: 50px; left: 50px;">absolute</u-block>
</f-draggable>
</div></div>
</template>