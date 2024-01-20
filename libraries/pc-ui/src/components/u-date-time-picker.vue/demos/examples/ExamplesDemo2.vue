<!-- 隐藏底部按钮 -->

<template>
  <div><u-linear-layout>
    <u-date-time-picker preIcon suffixIcon="calendar" clearable :showFooterButton=false></u-date-time-picker>
    <u-date-time-picker preIcon suffixIcon="calendar" clearable :showRightNowButton=false></u-date-time-picker>
    <u-date-time-picker preIcon suffixIcon="calendar" clearable :showRightNowButton=false :showFooterButton=false></u-date-time-picker>
</u-linear-layout></div>
</template>