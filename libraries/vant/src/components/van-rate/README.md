# VanRate 评分组件

评分组件，用于对事物进行评级操作。

## 基础用法

```vue
<template>
  <van-rate v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: 3,
    };
  },
};
</script>
```

## 自定义图标

```vue
<template>
  <van-rate v-model="value" icon="like" void-icon="like-o" />
</template>
```

## 半选模式

```vue
<template>
  <van-rate v-model="value" allow-half />
</template>
```

## 自定义颜色

```vue
<template>
  <van-rate v-model="value" color="#ff6b6b" void-color="#ddd" />
</template>
```

## 自定义大小

```vue
<template>
  <van-rate v-model="value" :size="30" :gutter="8" />
</template>
```

## 禁用状态

```vue
<template>
  <van-rate v-model="value" disabled />
</template>
```

## 只读状态

```vue
<template>
  <van-rate v-model="value" readonly />
</template>
```

## 自定义数量

```vue
<template>
  <van-rate v-model="value" :count="10" />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 评分的值 | _number_ | `0` |
| count | 图标总数 | _number_ | `5` |
| disabled | 是否为禁用状态 | _boolean_ | `false` |
| readonly | 是否为只读状态 | _boolean_ | `false` |
| allowHalf | 是否允许半选 | _boolean_ | `false` |
| size | 图标大小 | _string \| number_ | `20` |
| gutter | 图标间距 | _string \| number_ | `4` |
| color | 选中时的颜色 | _string_ | `#ffd21e` |
| voidColor | 未选中时的颜色 | _string_ | `#c8c9cc` |
| disabledColor | 禁用时的颜色 | _string_ | `#c8c9cc` |
| icon | 选中时的图标 | _string_ | `star` |
| voidIcon | 未选中时的图标 | _string_ | `star-o` |
| halfIcon | 半选时的图标 | _string_ | `star` |
| touchable | 是否开启点击反馈 | _boolean_ | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 分值改变时触发 | value: _number_ |
| click | 点击评分时触发 | value: _number_ |

### Slots

| 名称 | 说明 |
|------|------|
| default | 自定义图标内容 |

## 主题定制

### CSS 变量

| 名称 | 默认值 | 说明 |
|------|--------|------|
| --van-rate-icon-full-color | _#ffd21e_ | 选中时的颜色 |
| --van-rate-icon-void-color | _#c8c9cc_ | 未选中时的颜色 |
| --van-rate-icon-disabled-color | _#c8c9cc_ | 禁用时的颜色 |
| --van-rate-icon-size | _20px_ | 图标大小 |
| --van-rate-icon-gutter | _4px_ | 图标间距 | 