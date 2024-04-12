<!-- 折叠分组 -->

<template>
  <u-form layout="block" collapsible
    ><u-form-group expanded
        ><template #title><u-text text="常用条件"></u-text></template><u-form-item layout="center">
            <template #label><u-text text="名称"></u-text></template>
            <u-input placeholder="请输入名称"></u-input>
        </u-form-item
        ><u-form-item layout="center">
            <template #label><u-text text="状态"></u-text></template>
            <u-select>
                <u-select-item><u-text text="启用"></u-text></u-select-item>
                <u-select-item><u-text text="禁用"></u-text></u-select-item>
            </u-select>
        </u-form-item
    ></u-form-group
    ><u-form-group expanded
        ><template #title><u-text text="更多条件"></u-text></template><u-form-item layout="center">
            <template #label><u-text text="名称"></u-text></template>
            <u-input placeholder="请输入名称"></u-input>
        </u-form-item
        ><u-form-item layout="center">
            <template #label><u-text text="状态"></u-text></template>
            <u-select>
                <u-select-item><u-text text="启用"></u-text></u-select-item>
                <u-select-item><u-text text="禁用"></u-text></u-select-item>
            </u-select>
        </u-form-item
    ></u-form-group
></u-form>
</template>
