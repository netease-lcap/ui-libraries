<!-- 线性标签 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-linear-layout gap="small">
        <u-label text="Label" type="line"></u-label>
        <u-label color="primary" text="Primary" type="line"></u-label>
        <u-label color="success" text="Success" type="line"></u-label>
        <u-label color="warning" text="Warning" type="line"></u-label>
        <u-label color="error" text="Error" type="line"></u-label>
    </u-linear-layout>
    <u-linear-layout gap="small">
        <u-label removable text="Label" type="line"></u-label>
        <u-label removable color="primary" text="Primary" type="line"></u-label>
        <u-label removable color="success" text="Success" type="line"></u-label>
        <u-label removable color="warning" text="Warning" type="line"></u-label>
        <u-label removable color="error" text="Error" type="line"></u-label>
    </u-linear-layout>
    <u-linear-layout gap="small">
        <u-label size="small" text="Small" type="line"></u-label>
        <u-label size="small" color="primary" removable text="Small" type="line"></u-label>
        <u-label text="Normal" type="line"></u-label>
        <u-label color="primary" removable text="Normal" type="line"></u-label>
        <u-label size="large" text="Large" type="line"></u-label>
        <u-label size="large" color="primary" removable text="Large" type="line"></u-label>
        <u-label size="huge" text="Huge" type="line"></u-label>
        <u-label size="huge" color="primary" removable text="Huge" type="line"></u-label>
    </u-linear-layout>
</u-linear-layout></div>
</template>