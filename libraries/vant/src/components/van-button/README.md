# VanButton 按钮组件

基于 Vant4 的 Button 组件封装的按钮组件，对应 Element Plus 的 Button 组件。

## 功能特性

- 支持多种按钮类型：默认、主要、成功、信息、警告、危险
- 支持不同尺寸：小、默认、大
- 支持朴素按钮样式
- 支持圆角和圆形按钮
- 支持加载状态
- 支持禁用状态
- 支持左图标和右图标
- 支持块级元素
- 支持自定义颜色
- 支持链接按钮
- 支持自动聚焦
- 支持原生按钮类型

## 基本用法

```vue
<template>
  <van-button text="默认按钮" @click="handleClick" />
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击');
};
</script>
```

## 按钮类型

```vue
<template>
  <van-button text="默认按钮" />
  <van-button text="主要按钮" type="primary" />
  <van-button text="成功按钮" type="success" />
  <van-button text="信息按钮" type="info" />
  <van-button text="警告按钮" type="warning" />
  <van-button text="危险按钮" type="danger" />
</template>
```

## 按钮尺寸

```vue
<template>
  <van-button text="小按钮" size="small" />
  <van-button text="默认按钮" size="default" />
  <van-button text="大按钮" size="large" />
</template>
```

## 朴素按钮

```vue
<template>
  <van-button text="朴素按钮" plain />
  <van-button text="主要按钮" type="primary" plain />
  <van-button text="成功按钮" type="success" plain />
  <van-button text="信息按钮" type="info" plain />
  <van-button text="警告按钮" type="warning" plain />
  <van-button text="危险按钮" type="danger" plain />
</template>
```

## 圆角按钮

```vue
<template>
  <van-button text="圆角按钮" round />
  <van-button text="主要按钮" type="primary" round />
  <van-button text="成功按钮" type="success" round />
  <van-button text="信息按钮" type="info" round />
  <van-button text="警告按钮" type="warning" round />
  <van-button text="危险按钮" type="danger" round />
</template>
```

## 圆形按钮

```vue
<template>
  <van-button icon="Plus" circle />
  <van-button icon="Plus" type="primary" circle />
  <van-button icon="Plus" type="success" circle />
  <van-button icon="Plus" type="info" circle />
  <van-button icon="Plus" type="warning" circle />
  <van-button icon="Plus" type="danger" circle />
</template>
```

## 加载状态

```vue
<template>
  <van-button text="加载中" loading />
  <van-button text="加载中" type="primary" loading />
  <van-button text="加载中" type="success" loading />
  <van-button text="加载中" type="info" loading />
  <van-button text="加载中" type="warning" loading />
  <van-button text="加载中" type="danger" loading />
</template>
```

## 禁用状态

```vue
<template>
  <van-button text="禁用按钮" disabled />
  <van-button text="禁用按钮" type="primary" disabled />
  <van-button text="禁用按钮" type="success" disabled />
  <van-button text="禁用按钮" type="info" disabled />
  <van-button text="禁用按钮" type="warning" disabled />
  <van-button text="禁用按钮" type="danger" disabled />
</template>
```

## 带图标

```vue
<template>
  <van-button text="左图标" icon="Search" />
  <van-button text="右图标" rightIcon="Arrow" />
  <van-button text="双图标" icon="Search" rightIcon="Arrow" />
</template>
```

## 块级元素

```vue
<template>
  <van-button text="块级按钮" block />
  <van-button text="块级按钮" type="primary" block />
  <van-button text="块级按钮" type="success" block />
</template>
```

## 自定义颜色

```vue
<template>
  <van-button text="自定义颜色" color="#7232dd" />
  <van-button text="自定义颜色" color="linear-gradient(to right, #4bb0ff, #6149f6)" />
</template>
```

## 链接按钮

```vue
<template>
  <van-button text="链接按钮" link />
  <van-button text="链接按钮" type="primary" link />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 按钮文字 | string | '按钮' |
| type | 按钮类型 | '' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger' | '' |
| size | 按钮尺寸 | 'small' \| 'default' \| 'large' | 'default' |
| plain | 是否为朴素按钮 | boolean | false |
| link | 是否为链接按钮 | boolean | false |
| round | 是否为圆角按钮 | boolean | false |
| circle | 是否为圆形按钮 | boolean | false |
| loading | 是否为加载中状态 | boolean | false |
| loadingIcon | 自定义加载中图标组件 | string | - |
| loadingText | 加载状态下的文字 | string | - |
| loadingType | 加载图标类型 | 'circular' \| 'spinner' | 'circular' |
| loadingSize | 加载图标大小 | string | - |
| disabled | 是否禁用按钮 | boolean | false |
| icon | 左图标组件 | string | - |
| rightIcon | 右图标组件 | string | - |
| autofocus | 原生 autofocus 属性 | boolean | false |
| nativeType | 原生 type 属性 | 'button' \| 'submit' \| 'reset' | 'button' |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | boolean | - |
| isPopConfirm | 是否开启二次确认 | boolean | - |
| title | 二次确认标题 | string | '确认操作？' |
| confirmButtonText | 弹框确认按钮文字 | string | '确认' |
| cancelButtonText | 弹框取消按钮文字 | string | '取消' |
| color | 自定义按钮颜色 | string | - |
| block | 是否为块级元素 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | (event: Event) |
| dblclick | 双击时触发 | (event: MouseEvent) |
| contextmenu | 右键点击时触发 | (event: MouseEvent) |
| mousedown | 鼠标按下时触发 | (event: MouseEvent) |
| mouseup | 鼠标释放时触发 | (event: MouseEvent) |
| mouseenter | 鼠标移入时触发 | (event: MouseEvent) |
| mouseleave | 鼠标移出时触发 | (event: MouseEvent) |
</rewritten_file> 