# VanBadge 徽标组件

基于 Vant4 的 Badge 组件封装的徽标组件，对应 Element Plus 的 Badge 组件。

## 功能特性

- 支持数字徽标和文字徽标
- 支持小圆点徽标
- 支持多种类型：主要、成功、警告、危险、信息
- 支持最大值限制
- 支持自定义颜色
- 支持不同位置：右上角、右下角、左上角、左下角
- 支持显示/隐藏零值
- 支持自定义内容
- 支持偏移量调整

## 基本用法

```vue
<template>
  <van-badge value="5">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">
      内容
    </div>
  </van-badge>
</template>
```

## 不同类型

```vue
<template>
  <van-badge value="5" type="primary">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">主要</div>
  </van-badge>
  <van-badge value="5" type="success">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">成功</div>
  </van-badge>
  <van-badge value="5" type="warning">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">警告</div>
  </van-badge>
  <van-badge value="5" type="danger">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">危险</div>
  </van-badge>
  <van-badge value="5" type="info">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">信息</div>
  </van-badge>
</template>
```

## 小圆点

```vue
<template>
  <van-badge is-dot>
    <div style="width: 40px; height: 40px; background: #f2f3f5;">小圆点</div>
  </van-badge>
  <van-badge is-dot type="primary">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">主要</div>
  </van-badge>
  <van-badge is-dot type="success">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">成功</div>
  </van-badge>
  <van-badge is-dot type="warning">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">警告</div>
  </van-badge>
  <van-badge is-dot type="danger">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">危险</div>
  </van-badge>
  <van-badge is-dot type="info">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">信息</div>
  </van-badge>
</template>
```

## 最大值

```vue
<template>
  <van-badge value="5" max="10">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">最大值10</div>
  </van-badge>
  <van-badge value="15" max="10">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">超过最大值</div>
  </van-badge>
  <van-badge value="99" max="99">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">最大值99</div>
  </van-badge>
  <van-badge value="100" max="99">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">超过最大值</div>
  </van-badge>
</template>
```

## 显示零值

```vue
<template>
  <van-badge value="0" show-zero>
    <div style="width: 40px; height: 40px; background: #f2f3f5;">显示零值</div>
  </van-badge>
  <van-badge value="0" :show-zero="false">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">隐藏零值</div>
  </van-badge>
</template>
```

## 自定义颜色

```vue
<template>
  <van-badge value="5" color="#1989fa">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">自定义颜色</div>
  </van-badge>
  <van-badge value="5" color="linear-gradient(to right, #4bb0ff, #6149f6)">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">渐变色</div>
  </van-badge>
</template>
```

## 不同位置

```vue
<template>
  <van-badge value="5" position="top-right">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">右上角</div>
  </van-badge>
  <van-badge value="5" position="bottom-right">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">右下角</div>
  </van-badge>
  <van-badge value="5" position="top-left">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">左上角</div>
  </van-badge>
  <van-badge value="5" position="bottom-left">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">左下角</div>
  </van-badge>
</template>
```

## 自定义内容

```vue
<template>
  <van-badge content="NEW">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">文字</div>
  </van-badge>
  <van-badge content="HOT">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">文字</div>
  </van-badge>
  <van-badge content="99+">
    <div style="width: 40px; height: 40px; background: #f2f3f5;">文字</div>
  </van-badge>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 显示值 | string \| number | - |
| max | 最大值，超过最大值会显示 '{max}+' | number | - |
| isDot | 小圆点 | boolean | false |
| hidden | 隐藏 badge | boolean | false |
| type | 类型 | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'danger' |
| showZero | 值为零时是否显示 Badge | boolean | true |
| color | 背景色 | string | '' |
| leftOffset | 左偏移量 | number | - |
| topOffset | 上偏移量 | number | - |
| position | 徽标位置 | 'top-right' \| 'bottom-right' \| 'top-left' \| 'bottom-left' | 'top-right' |
| content | 徽标内容 | string | - |
| badgeStyle | 徽标样式 | string | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义默认内容 | 