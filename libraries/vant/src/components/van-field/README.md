# VanField 输入框组件

基于 Vant4 的 Field 组件封装的输入框组件，对应 Element Plus 的 Input 组件。

## 功能特性

- 支持多种输入类型：文本、密码、数字、邮箱、电话、多行文本
- 支持标签显示和自定义
- 支持前缀和后缀图标
- 支持清空功能
- 支持禁用和只读状态
- 支持错误状态和错误信息
- 支持不同尺寸
- 支持自动聚焦
- 支持最大长度限制
- 支持多行文本自动调整高度

## 基本用法

```vue
<template>
  <van-field 
    v-model="value" 
    placeholder="请输入内容"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
```

## 带标签

```vue
<template>
  <van-field 
    v-model="value" 
    label="用户名"
    placeholder="请输入用户名"
    clearable
    required
  />
</template>
```

## 不同类型

```vue
<template>
  <!-- 文本输入 -->
  <van-field v-model="text" label="文本" placeholder="请输入文本" />
  
  <!-- 密码输入 -->
  <van-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
  
  <!-- 数字输入 -->
  <van-field v-model="number" label="数字" type="number" placeholder="请输入数字" />
  
  <!-- 邮箱输入 -->
  <van-field v-model="email" label="邮箱" type="email" placeholder="请输入邮箱" />
  
  <!-- 电话输入 -->
  <van-field v-model="tel" label="电话" type="tel" placeholder="请输入电话" />
  
  <!-- 多行文本 -->
  <van-field v-model="textarea" label="多行文本" type="textarea" placeholder="请输入多行文本" rows="3" autosize />
</template>
```

## 带图标

```vue
<template>
  <van-field 
    v-model="value" 
    label="搜索"
    placeholder="请输入搜索内容"
    prefix-icon="Search"
    suffix-icon="Arrow"
    clearable
  />
</template>
```

## 不同尺寸

```vue
<template>
  <van-field v-model="small" label="小尺寸" size="small" placeholder="小尺寸输入框" />
  <van-field v-model="default" label="默认尺寸" size="default" placeholder="默认尺寸输入框" />
  <van-field v-model="large" label="大尺寸" size="large" placeholder="大尺寸输入框" />
</template>
```

## 错误状态

```vue
<template>
  <van-field 
    v-model="value" 
    label="用户名"
    placeholder="请输入用户名"
    error
    error-message="用户名不能为空"
    required
  />
</template>
```

## 禁用和只读

```vue
<template>
  <!-- 禁用状态 -->
  <van-field v-model="disabledValue" label="禁用状态" disabled />
  
  <!-- 只读状态 -->
  <van-field v-model="readonlyValue" label="只读状态" readonly />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 输入框的值 | string | - |
| type | 输入框类型 | 'text' \| 'password' \| 'number' \| 'email' \| 'tel' \| 'textarea' | 'text' |
| placeholder | 占位符 | string | '请输入内容' |
| clearable | 是否可清空 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| readonly | 是否只读 | boolean | false |
| maxlength | 最大文本长度 | string \| number | - |
| size | 尺寸 | 'small' \| 'default' \| 'large' | 'default' |
| prefixIcon | 前缀图标 | string | - |
| suffixIcon | 后缀图标 | string | - |
| label | 标签 | string | - |
| labelWidth | 标签宽度 | string | - |
| labelAlign | 标签对齐方式 | 'left' \| 'top' \| 'right' | 'left' |
| showLabel | 是否显示标签 | boolean | true |
| required | 是否必填 | boolean | false |
| autofocus | 自动聚焦 | boolean | false |
| autocomplete | 自动完成 | boolean | false |
| spellcheck | 拼写检查 | boolean | false |
| rows | 多行文本行数 | number | 3 |
| autosize | 自动调整高度 | boolean | false |
| maxHeight | 最大高度 | string | - |
| minHeight | 最小高度 | string | - |
| inputAlign | 输入框对齐方式 | 'left' \| 'center' \| 'right' | 'left' |
| errorMessage | 错误信息 | string | - |
| error | 错误状态 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| input | 输入时触发 | (value: string) |
| change | 值改变时触发 | (value: string) |
| clear | 清空按钮点击时触发 | (event: Event) |
| click | 点击时触发 | (event: Event) |
| focus | 获得焦点时触发 | (event: Event) |
| blur | 失去焦点时触发 | (event: Event) |
| keydown | 键盘按下时触发 | (event: Event) |
| keyup | 键盘释放时触发 | (event: Event) |
| compositionend | 中文输入结束时触发 | (event: Event) |
| compositionstart | 中文输入开始时触发 | (event: Event) |
| paste | 粘贴时触发 | (event: Event) |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prepend | 前置内容 |
| append | 后置内容 |
| label | 自定义标签 |
| input | 自定义输入框 |
| button | 自定义按钮 |
| rightIcon | 自定义右侧图标 |
| leftIcon | 自定义左侧图标 |
``` 