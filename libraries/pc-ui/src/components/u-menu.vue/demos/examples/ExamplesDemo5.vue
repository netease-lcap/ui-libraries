<!-- 分组 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>默认，无折叠功能</p>
            <u-menu>
                <u-menu-group title="Basic">
                    <u-menu-item>链接</u-menu-item>
                    <u-menu-item>按钮</u-menu-item>
                    <u-menu-item>标签</u-menu-item>
                </u-menu-group>
                <u-menu-group title="Navigation">
                    <u-menu-item>导航栏</u-menu-item>
                    <u-menu-item to="/components/u-menu">侧边栏</u-menu-item>
                    <u-menu-item>标签页</u-menu-item>
                </u-menu-group>
                <u-menu-group title="Form">
                    <u-menu-item>单行输入</u-menu-item>
                    <u-menu-item>多行输入</u-menu-item>
                    <u-menu-item>选择框</u-menu-item>
                    <u-menu-item>表单</u-menu-item>
                </u-menu-group>
            </u-menu>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout></div>
</template>