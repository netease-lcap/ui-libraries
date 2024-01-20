<!-- 多级菜单 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-menu style="width: 200px;">
        <u-menu-item>指南</u-menu-item>
        <u-menu-item>API
            <u-menu slot="sub">
                <u-menu-item to="/api/cli">命令行工具（CLI）</u-menu-item>
                <u-menu-item to="/api/config">配置</u-menu-item>
            </u-menu>
        </u-menu-item>
        <u-menu-item>组件
            <u-menu slot="sub">
                <u-menu-item>原型组件
                    <u-menu slot="sub">
                        <u-menu-item>Basic
                            <u-menu slot="sub">
                                <u-menu-item to="/components/u-link">链接 Link</u-menu-item>
                                <u-menu-item to="/components/u-button">按钮 Button</u-menu-item>
                                <u-menu-item to="/components/u-badge">徽章 Badge</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                        <u-menu-item>Navigation
                            <u-menu slot="sub">
                                <u-menu-item to="/components/u-navbar">导航栏 Navbar</u-menu-item>
                                <u-menu-item to="/components/u-sidebar">侧边栏 Sidebar</u-menu-item>
                                <u-menu-item to="/components/u-menu">菜单 Menu</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                        <u-menu-item>Popper
                            <u-menu slot="sub">
                                <u-menu-item to="/components/m-popper">弹出层 Popper</u-menu-item>
                                <u-menu-item to="/components/u-tooltip">工具提示 Tooltip</u-menu-item>
                                <u-menu-item to="/components/u-popup">弹出框 Popup</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                    </u-menu>
                </u-menu-item>
                <u-menu-item to="/ui-design">组件设计方案</u-menu-item>
            </u-menu>
        </u-menu-item>
        <u-menu-item target="_blank" href="https://github.com/vusion">GitHub</u-menu-item>
    </u-menu>
    <div>
        <u-button>
            多级菜单
            <u-popup>
                <u-menu slot="root" style="width: 200px;">
                    <u-menu-item>指南</u-menu-item>
                    <u-menu-item>API
                        <u-menu slot="sub">
                            <u-menu-item to="/api/cli">命令行工具（CLI）</u-menu-item>
                            <u-menu-item to="/api/config">配置</u-menu-item>
                        </u-menu>
                    </u-menu-item>
                    <u-menu-item>组件
                        <u-menu slot="sub">
                            <u-menu-item>原型组件
                                <u-menu slot="sub">
                                    <u-menu-item>Basic
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/u-link">链接 Link</u-menu-item>
                                            <u-menu-item to="/components/u-button">按钮 Button</u-menu-item>
                                            <u-menu-item to="/components/u-badge">徽章 Badge</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                    <u-menu-item>Navigation
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/u-navbar">导航栏 Navbar</u-menu-item>
                                            <u-menu-item to="/components/u-sidebar">侧边栏 Sidebar</u-menu-item>
                                            <u-menu-item to="/components/u-menu">菜单 Menu</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                    <u-menu-item>Popper
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/m-popper">弹出层 Popper</u-menu-item>
                                            <u-menu-item to="/components/u-tooltip">工具提示 Tooltip</u-menu-item>
                                            <u-menu-item to="/components/u-popup">弹出框 Popup</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                </u-menu>
                            </u-menu-item>
                            <u-menu-item to="/ui-design">组件设计方案</u-menu-item>
                        </u-menu>
                    </u-menu-item>
                    <u-menu-item target="_blank" href="https://github.com/vusion">GitHub</u-menu-item>
                </u-menu>
            </u-popup>
        </u-button>
    </div>
</u-linear-layout></div>
</template>