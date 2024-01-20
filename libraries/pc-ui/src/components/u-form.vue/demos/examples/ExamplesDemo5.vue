<!-- 插槽 -->

<template>
  <div><u-form ref="form">
    <u-form-item required layout="block">
        <span slot="label">
            用户名
        </span>
        <div slot="description">描述描述</div>
        <u-icon-tooltip slot="extra" content="请输入正确格式的中文汉字"></u-icon-tooltip>
        <u-input maxlength="4" maxlength-message="不超过4个字符" placeholder="不超过4个字符"></u-input>
    </u-form-item>
</u-form></div>
</template>