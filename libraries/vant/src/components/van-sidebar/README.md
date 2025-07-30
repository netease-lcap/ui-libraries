# VanSidebar 侧边导航组件

基于 Vant4 设计理念的侧边导航组件，用于网站导航功能。

## 功能特性

- 支持垂直布局的侧边导航
- 支持激活状态和禁用状态
- 支持自定义颜色主题
- 支持图标和徽标显示
- 支持激活指示器
- 支持边框显示控制
- 支持路由模式
- 支持数据源绑定
- 支持响应式设计

## 基本用法

```vue
<template>
  <div style="height: 400px; display: flex;">
    <van-sidebar v-model="activeIndex" @select="handleSelect">
      <van-sidebar-item index="1" text="导航一" />
      <van-sidebar-item index="2" text="导航二" />
      <van-sidebar-item index="3" text="导航三" />
    </van-sidebar>
    <div style="flex: 1; padding: 20px;">
      <p>当前选中: {{ activeIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');

const handleSelect = (index) => {
  console.log('选中导航项:', index);
};
</script>
```

## 带图标

```vue
<template>
  <van-sidebar v-model="activeIndex">
    <van-sidebar-item index="1" text="首页" icon="home-o" />
    <van-sidebar-item index="2" text="用户" icon="user-o" />
    <van-sidebar-item index="3" text="设置" icon="setting-o" />
  </van-sidebar>
</template>
```

## 带徽标

```vue
<template>
  <van-sidebar v-model="activeIndex">
    <van-sidebar-item index="1" text="消息" badge="5" />
    <van-sidebar-item index="2" text="通知" badge="99+" badge-type="danger" />
    <van-sidebar-item index="3" text="提醒" badge-dot />
  </van-sidebar>
</template>
```

## 自定义颜色

```vue
<template>
  <van-sidebar 
    v-model="activeIndex"
    background-color="#2c3e50"
    text-color="#ecf0f1"
    active-text-color="#3498db"
    active-background-color="#34495e">
    <van-sidebar-item index="1" text="导航一" />
    <van-sidebar-item index="2" text="导航二" />
    <van-sidebar-item index="3" text="导航三" />
  </van-sidebar>
</template>
```

## 禁用状态

```vue
<template>
  <van-sidebar v-model="activeIndex" disabled>
    <van-sidebar-item index="1" text="导航一" />
    <van-sidebar-item index="2" text="导航二" disabled />
    <van-sidebar-item index="3" text="导航三" />
  </van-sidebar>
</template>
```

## 无边框

```vue
<template>
  <van-sidebar v-model="activeIndex" :show-border="false">
    <van-sidebar-item index="1" text="导航一" />
    <van-sidebar-item index="2" text="导航二" />
    <van-sidebar-item index="3" text="导航三" />
  </van-sidebar>
</template>
```

## 无指示器

```vue
<template>
  <van-sidebar v-model="activeIndex" :show-active-indicator="false">
    <van-sidebar-item index="1" text="导航一" />
    <van-sidebar-item index="2" text="导航二" />
    <van-sidebar-item index="3" text="导航三" />
  </van-sidebar>
</template>
```

## API

### Sidebar Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 当前激活的导航项 | string \| number | - |
| defaultActive | 默认激活的导航项 | string | - |
| disabled | 是否禁用侧边导航 | boolean | false |
| readonly | 是否只读状态 | boolean | false |
| width | 侧边导航的宽度 | string | '200px' |
| backgroundColor | 侧边导航的背景颜色 | string | '#f7f8fa' |
| textColor | 侧边导航的文字颜色 | string | '#323233' |
| activeTextColor | 激活状态的文字颜色 | string | '#1989fa' |
| activeBackgroundColor | 激活状态的背景颜色 | string | '#e8f3ff' |
| borderColor | 侧边导航的边框颜色 | string | '#ebedf0' |
| showBorder | 是否显示边框 | boolean | true |
| showActiveIndicator | 是否显示激活指示器 | boolean | true |
| activeIndicatorWidth | 激活指示器的宽度 | string | '3px' |
| activeIndicatorColor | 激活指示器的颜色 | string | '#1989fa' |
| router | 是否使用路由模式 | boolean | false |
| uniqueOpened | 是否只保持一个子菜单的展开 | boolean | false |

### Sidebar Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 导航项激活时触发 | (event: { index: string, oldIndex: string }) |
| change | 当前激活的导航项改变时触发 | (value: string \| number) |
| click | 点击时触发 | (event: MouseEvent) |

### SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| index | 导航项标识 | string \| number | - |
| text | 导航项的文本内容 | string | '' |
| icon | 导航项的图标 | string | '' |
| disabled | 是否禁用该导航项 | boolean | false |
| active | 是否激活该导航项 | boolean | false |
| badge | 徽标内容 | string | '' |
| badgeType | 徽标类型 | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' | 'default' |
| badgeMax | 徽标最大值 | number | 0 |
| badgeDot | 徽标是否为小圆点 | boolean | false |

### SidebarItem Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击导航项时触发 | (event: MouseEvent) |

### Sidebar Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| setActiveItem | 激活指定的导航项 | (index: string) |
| reload | 重新加载 | - |

## 样式定制

### CSS 变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --van-sidebar-width | 200px | 侧边栏宽度 |
| --van-sidebar-background-color | #f7f8fa | 背景颜色 |
| --van-sidebar-text-color | #323233 | 文字颜色 |
| --van-sidebar-active-text-color | #1989fa | 激活文字颜色 |
| --van-sidebar-active-background-color | #e8f3ff | 激活背景颜色 |
| --van-sidebar-border-color | #ebedf0 | 边框颜色 |
| --van-sidebar-item-padding | 12px 16px | 导航项内边距 |
| --van-sidebar-item-font-size | 14px | 导航项字体大小 |
| --van-sidebar-item-line-height | 1.4 | 导航项行高 | 