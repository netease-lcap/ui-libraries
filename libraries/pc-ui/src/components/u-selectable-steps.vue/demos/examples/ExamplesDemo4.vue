<!-- 禁用 -->

<template>
  <div><u-selectable-steps :value="0" :readonly="false">
    <u-selectable-step title="Step1">Content1</u-selectable-step>
    <u-selectable-step title="Step2" disabled>Content2</u-selectable-step>
    <u-selectable-step title="Step3">Content3</u-selectable-step>
</u-selectable-steps></div>
</template>