<!-- 自定义标题 -->

<template>
  <div><u-selectable-steps :value="1">
    <u-selectable-step>
        <span slot="title">Step <u-label>1</u-label></span>
        Content1
    </u-selectable-step>
    <u-selectable-step>
        <span slot="title">Step <u-label>2</u-label></span>
        Content2
    </u-selectable-step>
    <u-selectable-step>
        <span slot="title">Step <u-label>3</u-label></span>
        Content3
    </u-selectable-step>
</u-selectable-steps></div>
</template>