# VanDivider 分割线组件

基于 Vant4 的 Divider 组件封装的分割线组件，对应 Element Plus 的 Divider 组件。

## 功能特性

- 支持水平和垂直分割线
- 支持自定义内容位置：左侧、右侧、中心
- 支持虚线样式
- 支持细线样式
- 支持自定义内容
- 支持自定义颜色
- 支持自定义字体大小
- 支持自定义边框样式
- 支持自定义边距

## 基本用法

```vue
<template>
  <van-divider>分割线</van-divider>
</template>
```

## 内容位置

```vue
<template>
  <van-divider content-position="left">
    左侧内容
  </van-divider>
  <van-divider content-position="center">
    中间内容
  </van-divider>
  <van-divider content-position="right">
    右侧内容
  </van-divider>
</template>
```

## 垂直分割线

```vue
<template>
  <span>文字</span>
  <van-divider direction="vertical" />
  <span>文字</span>
  <van-divider direction="vertical" />
  <span>文字</span>
</template>
```

## 虚线

```vue
<template>
  <van-divider dashed>
    虚线分割线
  </van-divider>
  <van-divider dashed content-position="left">
    左侧虚线
  </van-divider>
  <van-divider dashed content-position="right">
    右侧虚线
  </van-divider>
</template>
```

## 细线

```vue
<template>
  <van-divider hairline>
    细线分割线
  </van-divider>
  <van-divider :hairline="false">
    粗线分割线
  </van-divider>
</template>
```

## 自定义内容

```vue
<template>
  <van-divider>
    <van-icon name="star" style="margin-right: 8px;" />
    自定义图标
  </van-divider>
  <van-divider>
    <van-button size="small" type="primary">按钮</van-button>
  </van-divider>
  <van-divider>
    <span style="color: #1989fa; font-weight: bold;">自定义样式</span>
  </van-divider>
</template>
```

## 边框样式

```vue
<template>
  <van-divider border-style="solid">
    实线
  </van-divider>
  <van-divider border-style="dashed">
    虚线
  </van-divider>
  <van-divider border-style="dotted">
    点线
  </van-divider>
</template>
```

## 自定义颜色

```vue
<template>
  <van-divider color="#1989fa">
    蓝色分割线
  </van-divider>
  <van-divider color="#07c160">
    绿色分割线
  </van-divider>
  <van-divider color="#ee0a24">
    红色分割线
  </van-divider>
  <van-divider color="#ff976a">
    橙色分割线
  </van-divider>
</template>
```

## 自定义字体大小

```vue
<template>
  <van-divider font-size="12px">
    小字体
  </van-divider>
  <van-divider font-size="14px">
    默认字体
  </van-divider>
  <van-divider font-size="16px">
    大字体
  </van-divider>
  <van-divider font-size="18px">
    更大字体
  </van-divider>
</template>
```

## 自定义边距

```vue
<template>
  <van-divider margin-left="0px" margin-right="0px">
    无边距
  </van-divider>
  <van-divider margin-left="32px" margin-right="32px">
    大边距
  </van-divider>
  <van-divider margin-left="8px" margin-right="8px">
    小边距
  </van-divider>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 分割线方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| contentPosition | 分割线文案的位置 | 'left' \| 'right' \| 'center' | 'center' |
| dashed | 是否使用虚线 | boolean | false |
| hairline | 是否使用细线 | boolean | true |
| content | 分割线内容 | string | - |
| color | 分割线颜色 | string | '#dcdee0' |
| fontSize | 文字字体大小 | string | '14px' |
| borderStyle | 边框样式 | 'solid' \| 'dashed' \| 'dotted' | 'solid' |
| marginLeft | 左边距 | string | '16px' |
| marginRight | 右边距 | string | '16px' |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 分割线内文案的内容 | 