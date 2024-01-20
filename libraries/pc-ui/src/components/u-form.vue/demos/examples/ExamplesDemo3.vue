<!-- 栅格布局 -->

<template>
  <div><u-form repeat="3">
    <u-form-item label="状态">
        <u-select auto-select>
            <u-select-item>认证中</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="备案类型">
        <u-select auto-select>
            <u-select-item>全部</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="备案号">
        <u-input maxlength="63"></u-input>
    </u-form-item>
    <u-form-item label="用户名">
        <u-input maxlength="63"></u-input>
    </u-form-item>
    <u-form-item label="单位名称">
        <u-input maxlength="63"></u-input>
    </u-form-item>
    <u-form-item span="3">
        <u-button color="primary">查询</u-button>
    </u-form-item>
</u-form></div>
</template>