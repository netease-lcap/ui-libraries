<!-- 指定状态 -->

<template>
  <div><u-selectable-steps :value="0" :readonly="false" size="auto">
    <u-selectable-step title="Step1" status="passed" >Content1</u-selectable-step>
    <u-selectable-step title="Step2" status="failed" >Content2</u-selectable-step>
    <u-selectable-step title="Step3" status="selected" >Content3</u-selectable-step>
    <u-selectable-step title="Step4" status="pending" >Content4</u-selectable-step>
</u-selectable-steps></div>
</template>