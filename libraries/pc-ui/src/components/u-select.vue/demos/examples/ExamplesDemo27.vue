<!-- 前缀方式 -->

<template>
  <div><u-linear-layout>
    <u-select prefix="search">
        <u-select-item value="java">Java</u-select-item>
        <u-select-item value="nodejs">Node.js</u-select-item>
        <u-select-item value="go">Go</u-select-item>
        <u-select-item value="python">Python</u-select-item>
        <u-select-item value="ruby">Ruby</u-select-item>
        <u-select-item value="csharp">C#</u-select-item>
        <u-select-item value="php">PHP</u-select-item>
    </u-select>
    <u-select suffix="search" placeholder="设置占位符">
        <u-select-item value="java">Java</u-select-item>
        <u-select-item value="nodejs">Node.js</u-select-item>
        <u-select-item value="go">Go</u-select-item>
        <u-select-item value="python">Python</u-select-item>
        <u-select-item value="ruby">Ruby</u-select-item>
        <u-select-item value="csharp">C#</u-select-item>
        <u-select-item value="php">PHP</u-select-item>
    </u-select>
</u-linear-layout></div>
</template>