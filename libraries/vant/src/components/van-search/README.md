# VanSearch 搜索框组件

搜索框组件，用于搜索功能。

## 基础用法

```vue
<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
```

## 带操作按钮

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    action-text="搜索"
    @search="onSearch"
  />
</template>
```

## 自定义形状

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    shape="round"
  />
</template>
```

## 自定义背景色

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    background="#e8f4fd"
  />
</template>
```

## 对齐方式

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    input-align="center"
  />
</template>
```

## 搜索图标位置

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    icon-align="right"
  />
</template>
```

## 最大字符数

```vue
<template>
  <van-search
    v-model="value"
    placeholder="最多输入20个字符"
    :maxlength="20"
  />
</template>
```

## 禁用状态

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    disabled
  />
</template>
```

## 只读状态

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    readonly
  />
</template>
```

## 清除图标显示时机

```vue
<template>
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
    clear-trigger="always"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 搜索框的值 | _string_ | `''` |
| placeholder | 占位符 | _string_ | `'请输入搜索关键词'` |
| disabled | 是否为禁用状态 | _boolean_ | `false` |
| readonly | 是否为只读状态 | _boolean_ | `false` |
| clearable | 是否可清除 | _boolean_ | `true` |
| clearTrigger | 清除图标的显示时机 | _'always' \| 'focus'_ | `'focus'` |
| inputAlign | 对齐方式 | _'left' \| 'center' \| 'right'_ | `'left'` |
| iconAlign | 搜索图标位置 | _'left' \| 'right'_ | `'left'` |
| shape | 形状 | _'square' \| 'round'_ | `'square'` |
| background | 背景色 | _string_ | `'#f7f8fa'` |
| maxlength | 最大字符数 | _number_ | - |
| autofocus | 自动聚焦 | _boolean_ | `false` |
| actionText | 按钮文字 | _string_ | - |
| showAction | 是否显示操作按钮 | _boolean_ | `false` |
| autocomplete | 是否启用自动完成 | _boolean_ | `false` |
| spellcheck | 是否开启拼写检查 | _boolean_ | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 确定搜索时触发 | value: _string_ |
| input | 输入框内容变化时触发 | value: _string_ |
| focus | 输入框获得焦点时触发 | event: _Event_ |
| blur | 输入框失去焦点时触发 | event: _Event_ |
| icon-search | 点击搜索图标时触发 | event: _Event_ |
| click-input | 点击输入区域时触发 | event: _Event_ |
| clear | 点击清除图标时触发 | event: _Event_ |
| action | 点击操作按钮时触发 | event: _Event_ |

### Slots

| 名称 | 说明 |
|------|------|
| icon | 自定义搜索图标 |
| action | 自定义操作按钮 |
| left | 自定义左侧内容 |
| right | 自定义右侧内容 |

## 主题定制

### CSS 变量

| 名称 | 默认值 | 说明 |
|------|--------|------|
| --van-search-padding | _10px 16px_ | 搜索框内边距 |
| --van-search-background-color | _#f7f8fa_ | 搜索框背景色 |
| --van-search-content-background | _#fff_ | 输入框背景色 |
| --van-search-input-height | _32px_ | 输入框高度 |
| --van-search-input-font-size | _14px_ | 输入框字体大小 |
| --van-search-input-text-color | _#323233_ | 输入框文字颜色 |
| --van-search-input-placeholder-color | _#c8c9cc_ | 输入框占位符颜色 |
| --van-search-action-padding | _0 0 0 8px_ | 操作按钮内边距 |
| --van-search-action-text-color | _#323233_ | 操作按钮文字颜色 |
| --van-search-action-font-size | _14px_ | 操作按钮字体大小 | 