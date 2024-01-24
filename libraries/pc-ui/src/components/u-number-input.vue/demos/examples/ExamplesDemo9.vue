<!-- 只读和禁用 -->

<template>
  <div><u-linear-layout>
    <u-number-input :value="6" readonly></u-number-input>
    <u-number-input :value="6" disabled></u-number-input>
    <u-number-input buttonDisplay="bothEnds" :value="6" readonly></u-number-input>
    <u-number-input buttonDisplay="bothEnds" :value="6" disabled></u-number-input>
</u-linear-layout></div>
</template>