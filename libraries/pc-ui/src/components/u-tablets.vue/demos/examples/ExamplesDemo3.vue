<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-linear-layout>
<u-tablets value="C" readonly>
    <u-tablet value="A">Apple</u-tablet>
    <u-tablet value="B">Banana</u-tablet>
    <u-tablet value="C">Cake</u-tablet>
</u-tablets>
<u-tablets value="C" disabled>
    <u-tablet value="A">Apple</u-tablet>
    <u-tablet value="B">Banana</u-tablet>
    <u-tablet value="C">Cake</u-tablet>
</u-tablets>
<u-tablets value="C">
    <u-tablet value="A">Apple</u-tablet>
    <u-tablet value="B" disabled>Banana</u-tablet>
    <u-tablet value="C">Cake</u-tablet>
</u-tablets>
</u-linear-layout></div>
</template>