<!-- 右键菜单 -->

<template>
  <div><u-button>
    右键菜单
    <u-popup trigger="right-click" placement="right-start" follow-cursor>
        <u-menu slot="root" value="3" :router="false">
            <u-menu-item value="1">指南</u-menu-item>
            <u-menu-item value="2">概念</u-menu-item>
            <u-menu-item value="3">组件</u-menu-item>
        </u-menu>
    </u-popup>
</u-button></div>
</template>