<!-- 右键菜单 -->

<template>
  <div><u-button>
    右键菜单
    <m-popper trigger="right-click" placement="right-start" follow-cursor>
        <u-menu value="3" :router="false">
            <u-menu-item value="1">指南</u-menu-item>
            <u-menu-item value="2">概念</u-menu-item>
            <u-menu-item value="3">组件</u-menu-item>
        </u-menu>
    </m-popper>
</u-button></div>
</template>