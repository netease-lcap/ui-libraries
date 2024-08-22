<!-- 排列方式 -->

<template>
  <div style="width: 300px;">
    <h2>横向排列/默认，且每行4列</h2>
    <u-radios :direction="'horizontal'" :column="4">
      <u-radio label="水杯">水杯</u-radio>
      <u-radio label="坚果" autofocus>坚果</u-radio>
      <u-radio label="毛巾">毛巾</u-radio>
      <u-radio label="沙发">沙发</u-radio>
      <u-radio label="radio5">radio5</u-radio>
      <u-radio label="radio6">radio6</u-radio>
      <u-radio label="radio7">radio7</u-radio>
      <u-radio label="radio8">radio8</u-radio>
      <u-radio label="radio9">radio9</u-radio>
    </u-radios>

    <h2>纵向排列</h2>
    <u-radios :direction="'vertical'">
      <u-radio label="水杯">水杯</u-radio>
      <u-radio label="坚果" autofocus>坚果</u-radio>
      <u-radio label="毛巾">毛巾</u-radio>
      <u-radio label="沙发">沙发</u-radio>
      <u-radio label="radio5">radio5</u-radio>
      <u-radio label="radio6">radio6</u-radio>
      <u-radio label="radio7">radio7</u-radio>
      <u-radio label="radio8">radio8</u-radio>
      <u-radio label="radio9">radio9</u-radio>
  </u-radios>
  </div>
</template>