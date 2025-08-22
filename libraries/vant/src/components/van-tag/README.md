# VanTag 标签组件

基于 Vant4 的 Tag 组件封装的标签组件，对应 Element Plus 的 Tag 组件。

## 功能特性

- 支持多种类型：默认、主要、成功、警告、危险
- 支持不同尺寸：小、默认、大
- 支持不同主题：深色、浅色、朴素
- 支持可关闭
- 支持自定义颜色
- 支持圆角、描边
- 支持左侧图标
- 支持禁用渐变动画

## 基本用法

```vue
<template>
  <van-tag text="标签" />
</template>
```

## 不同类型

```vue
<template>
  <van-tag text="默认" />
  <van-tag text="主要" type="primary" />
  <van-tag text="成功" type="success" />
  <van-tag text="警告" type="warning" />
  <van-tag text="危险" type="danger" />
</template>
```

## 不同尺寸

```vue
<template>
  <van-tag text="小" size="small" />
  <van-tag text="默认" size="default" />
  <van-tag text="大" size="large" />
</template>
```

## 不同主题

```vue
<template>
  <van-tag text="深色" effect="dark" />
  <van-tag text="浅色" effect="light" />
  <van-tag text="朴素" effect="plain" />
</template>
```

## 可关闭

```vue
<template>
  <van-tag text="可关闭" closable />
  <van-tag text="主要" type="primary" closable />
  <van-tag text="成功" type="success" closable />
  <van-tag text="警告" type="warning" closable />
  <van-tag text="危险" type="danger" closable />
</template>
```

## 带图标

```vue
<template>
  <van-tag text="标签" icon="Star" />
  <van-tag text="主要" type="primary" icon="Star" />
  <van-tag text="成功" type="success" icon="Star" />
  <van-tag text="警告" type="warning" icon="Star" />
  <van-tag text="危险" type="danger" icon="Star" />
</template>
```

## 自定义颜色

```vue
<template>
  <van-tag text="自定义颜色" color="#7232dd" />
  <van-tag text="渐变色" color="linear-gradient(to right, #4bb0ff, #6149f6)" />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 标签内容 | string | '' |
| type | 标签类型 | '' \| 'primary' \| 'success' \| 'warning' \| 'danger' | '' |
| color | 自定义标签颜色 | string | - |
| size | 标签尺寸 | 'small' \| 'default' \| 'large' | 'default' |
| effect | 标签主题 | 'dark' \| 'light' \| 'plain' | 'light' |
| closable | 是否可关闭 | boolean | false |
| disableTransitions | 是否禁用渐变动画 | boolean | false |
| hit | 是否有边框描边 | boolean | false |
| round | 是否为圆角标签 | boolean | false |
| icon | 标签左侧图标 | string | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击标签时触发 | (event: MouseEvent) |
| close | 关闭标签时触发 | (event: MouseEvent) |
``` 