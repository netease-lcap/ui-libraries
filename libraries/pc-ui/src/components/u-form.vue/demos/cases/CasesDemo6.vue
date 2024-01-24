<!-- 分组 Small -->

<template>
  <div><u-form layout="inline" size="small" collapsible>
    <u-form-group title="常用条件" expanded>
        <u-form-item label="名称">
            <u-input placeholder="请输入名称"></u-input>
        </u-form-item>
        <u-form-item label="状态">
            <u-select>
                <u-select-item>启用</u-select-item>
                <u-select-item>禁用</u-select-item>
            </u-select>
        </u-form-item>
    </u-form-group>
    <u-form-group title="更多条件" expanded>
        <u-form-item label="名称">
            <u-input placeholder="请输入名称"></u-input>
        </u-form-item>
        <u-form-item label="状态">
            <u-select>
                <u-select-item>启用</u-select-item>
                <u-select-item>禁用</u-select-item>
            </u-select>
        </u-form-item>
    </u-form-group>
</u-form></div>
</template>