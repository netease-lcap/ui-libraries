# VanPasswordInput 密码输入框组件

基于 Vant4 的 PasswordInput 组件封装的密码输入框组件，用于安全地输入密码。

## 功能特性

- 支持自定义密码长度
- 支持显示/隐藏密码
- 支持光标显示控制
- 支持错误状态和错误信息
- 支持禁用和只读状态
- 支持自动聚焦
- 支持自定义样式（颜色、背景、边框、圆角）
- 支持自定义间距和尺寸
- 支持表单验证
- 支持多种事件回调

## 基本用法

```vue
<template>
  <van-password-input v-model="password" />
</template>

<script>
export default {
  data() {
    return {
      password: '',
    };
  },
};
</script>
```

## 不同长度

```vue
<template>
  <van-password-input length="4" placeholder="4位密码" />
  <van-password-input length="6" placeholder="6位密码" />
  <van-password-input length="8" placeholder="8位密码" />
  <van-password-input length="10" placeholder="10位密码" />
</template>
```

## 显示密码

```vue
<template>
  <van-password-input :mask="true" placeholder="隐藏密码" />
  <van-password-input :mask="false" placeholder="显示密码" />
</template>
```

## 光标显示

```vue
<template>
  <van-password-input :show-cursor="true" placeholder="显示光标" />
  <van-password-input :show-cursor="false" placeholder="隐藏光标" />
</template>
```

## 错误状态

```vue
<template>
  <van-password-input error placeholder="错误状态" />
  <van-password-input 
    error 
    error-message="密码错误，请重新输入" 
    placeholder="错误状态" 
  />
</template>
```

## 禁用状态

```vue
<template>
  <van-password-input disabled placeholder="禁用状态" />
  <van-password-input readonly placeholder="只读状态" />
</template>
```

## 自定义尺寸

```vue
<template>
  <van-password-input size="25px" placeholder="小尺寸" />
  <van-password-input size="35px" placeholder="默认尺寸" />
  <van-password-input size="45px" placeholder="大尺寸" />
  <van-password-input size="55px" placeholder="超大尺寸" />
</template>
```

## 自定义间距

```vue
<template>
  <van-password-input gutter="0px" placeholder="无间距" />
  <van-password-input gutter="4px" placeholder="小间距" />
  <van-password-input gutter="8px" placeholder="默认间距" />
  <van-password-input gutter="16px" placeholder="大间距" />
</template>
```

## 自定义颜色

```vue
<template>
  <van-password-input color="#1989fa" placeholder="蓝色主题" />
  <van-password-input color="#07c160" placeholder="绿色主题" />
  <van-password-input color="#ee0a24" placeholder="红色主题" />
  <van-password-input color="#ff976a" placeholder="橙色主题" />
  <van-password-input color="#7232dd" placeholder="紫色主题" />
</template>
```

## 自定义背景

```vue
<template>
  <van-password-input background-color="#f7f8fa" placeholder="浅灰背景" />
  <van-password-input background-color="#e8f4fd" placeholder="浅蓝背景" />
  <van-password-input background-color="#f0f9ff" placeholder="浅青背景" />
  <van-password-input background-color="#f0fdf4" placeholder="浅绿背景" />
</template>
```

## 自定义边框

```vue
<template>
  <van-password-input border-color="#1989fa" placeholder="蓝色边框" />
  <van-password-input border-color="#07c160" placeholder="绿色边框" />
  <van-password-input border-color="#ee0a24" placeholder="红色边框" />
  <van-password-input border-color="#ff976a" placeholder="橙色边框" />
</template>
```

## 自定义圆角

```vue
<template>
  <van-password-input border-radius="0px" placeholder="直角" />
  <van-password-input border-radius="4px" placeholder="小圆角" />
  <van-password-input border-radius="8px" placeholder="中圆角" />
  <van-password-input border-radius="16px" placeholder="大圆角" />
  <van-password-input border-radius="50%" placeholder="圆形" />
</template>
```

## 验证功能

```vue
<template>
  <van-password-input minlength="4" maxlength="8" placeholder="4-8位密码" />
  <van-password-input required placeholder="必填密码" />
  <van-password-input name="password" placeholder="表单字段" />
</template>
```

## 事件处理

```vue
<template>
  <van-password-input
    v-model="password"
    @input="onInput"
    @finish="onFinish"
    @focus="onFocus"
    @blur="onBlur"
    @click="onClick"
    @keydown="onKeydown"
  />
</template>

<script>
export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    onInput(value) {
      console.log('输入:', value);
    },
    onFinish(value) {
      console.log('完成:', value);
    },
    onFocus(event) {
      console.log('聚焦:', event);
    },
    onBlur(event) {
      console.log('失焦:', event);
    },
    onClick(event) {
      console.log('点击:', event);
    },
    onKeydown(event) {
      console.log('按键:', event);
    },
  },
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 密码值 | string | '' |
| length | 密码长度 | number | 6 |
| placeholder | 占位符 | string | '请输入密码' |
| disabled | 是否禁用 | boolean | false |
| readonly | 是否只读 | boolean | false |
| autofocus | 是否自动聚焦 | boolean | false |
| mask | 是否隐藏密码 | boolean | true |
| showCursor | 聚焦时是否显示光标 | boolean | true |
| error | 是否显示错误状态 | boolean | false |
| errorMessage | 错误信息 | string | - |
| gutter | 输入框间距 | string | '0px' |
| size | 输入框大小 | string | '35px' |
| color | 输入框颜色 | string | '#1989fa' |
| backgroundColor | 输入框背景色 | string | '#f2f3f5' |
| borderColor | 输入框边框颜色 | string | '#ebedf0' |
| borderRadius | 输入框圆角 | string | '4px' |
| maxlength | 最大输入长度 | number | - |
| minlength | 最小输入长度 | number | - |
| required | 是否必填 | boolean | false |
| name | 表单字段名称 | string | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 输入时触发 | value: string |
| finish | 密码输入完成时触发 | value: string |
| focus | 获得焦点时触发 | event: Event |
| blur | 失去焦点时触发 | event: Event |
| click | 点击时触发 | event: Event |
| keydown | 键盘按下时触发 | event: Event |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义输入框内容 | 