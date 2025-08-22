# VanCircle 环形进度条组件

基于 Vant4 的 Circle 组件封装的环形进度条组件，用于展示操作进度，告知用户当前状态和预期。

## 功能特性

- 支持自定义进度值（0-100）
- 支持自定义尺寸
- 支持自定义进度条颜色和轨道颜色
- 支持自定义线条宽度
- 支持动画效果
- 支持顺时针/逆时针方向
- 支持自定义线条端点样式
- 支持自定义文字内容和样式
- 支持自定义文字位置
- 支持自定义填充颜色

## 基本用法

```vue
<template>
  <van-circle value="30" text="30%" />
</template>
```

## 不同进度值

```vue
<template>
  <van-circle value="0" text="0%" />
  <van-circle value="25" text="25%" />
  <van-circle value="50" text="50%" />
  <van-circle value="75" text="75%" />
  <van-circle value="100" text="100%" />
</template>
```

## 不同尺寸

```vue
<template>
  <van-circle value="30" size="60px" text="30%" />
  <van-circle value="30" size="100px" text="30%" />
  <van-circle value="30" size="150px" text="30%" />
  <van-circle value="30" size="200px" text="30%" />
</template>
```

## 不同颜色

```vue
<template>
  <van-circle value="30" color="#1989fa" text="30%" />
  <van-circle value="30" color="#07c160" text="30%" />
  <van-circle value="30" color="#ee0a24" text="30%" />
  <van-circle value="30" color="#ff976a" text="30%" />
  <van-circle value="30" color="#7232dd" text="30%" />
</template>
```

## 不同线条宽度

```vue
<template>
  <van-circle value="30" stroke-width="20" text="30%" />
  <van-circle value="30" stroke-width="40" text="30%" />
  <van-circle value="30" stroke-width="60" text="30%" />
  <van-circle value="30" stroke-width="80" text="30%" />
</template>
```

## 动画效果

```vue
<template>
  <van-circle value="30" speed="100" text="30%" />
  <van-circle value="60" speed="200" text="60%" />
  <van-circle value="90" speed="300" text="90%" />
</template>
```

## 方向控制

```vue
<template>
  <van-circle value="30" clockwise text="顺时针" />
  <van-circle value="30" :clockwise="false" text="逆时针" />
</template>
```

## 线条端点样式

```vue
<template>
  <van-circle value="30" stroke-linecap="butt" text="默认" />
  <van-circle value="30" stroke-linecap="round" text="圆形" />
  <van-circle value="30" stroke-linecap="square" text="方形" />
</template>
```

## 文字位置

```vue
<template>
  <van-circle value="30" text-position="top" text="顶部" />
  <van-circle value="30" text-position="center" text="居中" />
  <van-circle value="30" text-position="bottom" text="底部" />
</template>
```

## 自定义文字

```vue
<template>
  <van-circle value="30" text-color="#1989fa" text-size="16px">
    <div style="text-align: center;">
      <div style="font-size: 20px; font-weight: bold;">30%</div>
      <div style="font-size: 12px; color: #969799;">完成度</div>
    </div>
  </van-circle>
  <van-circle value="60" text-color="#07c160" text-size="18px">
    <div style="text-align: center;">
      <div style="font-size: 24px; font-weight: bold;">60</div>
      <div style="font-size: 12px; color: #969799;">分</div>
    </div>
  </van-circle>
  <van-circle value="90" text-color="#ee0a24" text-size="14px">
    <div style="text-align: center;">
      <div style="font-size: 18px; font-weight: bold;">优秀</div>
      <div style="font-size: 10px; color: #969799;">90%</div>
    </div>
  </van-circle>
</template>
```

## 隐藏文字

```vue
<template>
  <van-circle value="30" :show-text="false" />
  <van-circle value="60" :show-text="false" />
  <van-circle value="90" :show-text="false" />
</template>
```

## 自定义填充

```vue
<template>
  <van-circle value="30" fill="#f7f8fa" text="30%" />
  <van-circle value="30" fill="#e8f4fd" text="30%" />
  <van-circle value="30" fill="#f0f9ff" text="30%" />
  <van-circle value="30" fill="#f0fdf4" text="30%" />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 进度值 | number | 0 |
| rate | 目标进度 | number | 100 |
| size | 尺寸 | string | '100px' |
| strokeWidth | 进度条宽度 | number | 40 |
| color | 进度条颜色 | string | '#337eff' |
| layerColor | 轨道颜色 | string | '#E5E5E5' |
| fill | 填充颜色 | string | '#ffffff' |
| text | 显示的文字 | string | - |
| speed | 动画速度 | number | 0 |
| clockwise | 是否顺时针方向 | boolean | true |
| strokeLinecap | 线条端点样式 | 'butt' \| 'round' \| 'square' | 'round' |
| showText | 是否显示文字 | boolean | true |
| textColor | 文字颜色 | string | '#323233' |
| textSize | 文字大小 | string | '14px' |
| textPosition | 文字位置 | 'center' \| 'top' \| 'bottom' | 'center' |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义文字内容 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 进度变化时触发 | value: number | 