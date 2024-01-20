<!-- 行内 -->

<template>
  <div><u-form layout="inline" label-size="auto">
    <u-form-item label="状态">
        <u-select auto-select>
            <u-select-item>认证中</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="用户名">
        <u-input maxlength="63" placeholder="请输入用户名"></u-input>
    </u-form-item>
    <u-form-item label="联系号码">
        <u-input maxlength="63" placeholder="请输入联系号码"></u-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary">查询</u-button>
    </u-form-item>
</u-form></div>
</template>