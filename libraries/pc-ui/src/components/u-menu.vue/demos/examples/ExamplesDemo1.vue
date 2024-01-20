<!-- 基本用法 -->

<template>
  <div><u-linear-layout>
    <u-button>
        Popup 菜单
        <u-popup>
            <u-menu slot="root">
                <u-menu-item to="/guides/">指南</u-menu-item>
                <u-menu-item to="/api/">API</u-menu-item>
                <u-menu-item to="/components/">原型组件</u-menu-item>
                <u-menu-item href="https://github.com/vusion">GitHub</u-menu-item>
            </u-menu>
        </u-popup>
    </u-button>
    <u-button>
        Popper 菜单
        <m-popper>
            <u-menu value="3" :router="false" style="width: 128px;">
                <u-menu-item to="/guides/">指南</u-menu-item>
                <u-menu-item to="/api/">API</u-menu-item>
                <u-menu-item to="/components/">原型组件</u-menu-item>
                <u-menu-item href="https://github.com/vusion">GitHub</u-menu-item>
            </u-menu>
        </m-popper>
    </u-button>
</u-linear-layout></div>
</template>