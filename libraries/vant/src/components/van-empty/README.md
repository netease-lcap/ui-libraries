# VanEmpty 空状态组件

基于 Vant4 的 Empty 组件封装的空状态组件，用于展示空状态时的占位提示。

## 功能特性

- 支持多种图片类型：默认、错误、网络、搜索
- 支持自定义图片 URL
- 支持自定义图片大小
- 支持自定义描述文字
- 支持自定义样式（颜色、字体大小、边距）
- 支持显示/隐藏图片和描述
- 支持自定义底部内容
- 支持自定义插槽

## 基本用法

```vue
<template>
  <van-empty description="暂无数据" />
</template>
```

## 图片类型

```vue
<template>
  <van-empty image="default" description="暂无数据" />
  <van-empty image="error" description="加载失败" />
  <van-empty image="network" description="网络错误" />
  <van-empty image="search" description="暂无搜索结果" />
</template>
```

## 自定义图片

```vue
<template>
  <van-empty
    custom-image="https://img01.yzcdn.cn/vant/leaf.jpg"
    description="自定义图片"
  />
  <van-empty
    custom-image="https://img01.yzcdn.cn/vant/cat.jpeg"
    description="可爱猫咪"
  />
</template>
```

## 自定义大小

```vue
<template>
  <van-empty
    image="default"
    description="小尺寸"
    image-size="80px"
  />
  <van-empty
    image="default"
    description="默认尺寸"
    image-size="160px"
  />
  <van-empty
    image="default"
    description="大尺寸"
    image-size="240px"
  />
</template>
```

## 底部内容

```vue
<template>
  <van-empty description="暂无数据">
    <van-button round type="primary" size="small">
      立即添加
    </van-button>
  </van-empty>
  <van-empty description="暂无搜索结果">
    <van-button round type="danger" size="small">
      重新搜索
    </van-button>
  </van-empty>
  <van-empty description="网络连接失败">
    <van-button round type="warning" size="small">
      重试
    </van-button>
  </van-empty>
</template>
```

## 自定义插槽

```vue
<template>
  <van-empty>
    <template #image>
      <div style="width: 160px; height: 160px; background: #f2f3f5; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
        <van-icon name="star" size="48" color="#969799" />
      </div>
    </template>
    <template #description>
      <span style="color: #1989fa; font-weight: bold;">自定义描述</span>
    </template>
    <van-button round type="primary" size="small">
      自定义按钮
    </van-button>
  </van-empty>
</template>
```

## 隐藏元素

```vue
<template>
  <van-empty
    :show-image="false"
    description="只显示描述文字"
  />
  <van-empty
    :show-description="false"
    image="default"
  >
    <van-button round type="primary" size="small">
      只有图片和按钮
    </van-button>
  </van-empty>
  <van-empty
    :show-image="false"
    :show-description="false"
  >
    <van-button round type="primary" size="small">
      只有按钮
    </van-button>
  </van-empty>
</template>
```

## 自定义样式

```vue
<template>
  <van-empty
    image="default"
    description="蓝色主题"
    description-color="#1989fa"
    description-font-size="16px"
  />
  <van-empty
    image="default"
    description="绿色主题"
    description-color="#07c160"
    description-font-size="18px"
  />
  <van-empty
    image="default"
    description="红色主题"
    description-color="#ee0a24"
    description-font-size="12px"
  />
</template>
```

## 自定义边距

```vue
<template>
  <van-empty
    image="default"
    description="小边距"
    bottom-margin-top="8px"
  >
    <van-button round type="primary" size="small">
      按钮
    </van-button>
  </van-empty>
  <van-empty
    image="default"
    description="默认边距"
    bottom-margin-top="24px"
  >
    <van-button round type="primary" size="small">
      按钮
    </van-button>
  </van-empty>
  <van-empty
    image="default"
    description="大边距"
    bottom-margin-top="48px"
  >
    <van-button round type="primary" size="small">
      按钮
    </van-button>
  </van-empty>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| image | 图片类型 | 'default' \| 'error' \| 'network' \| 'search' | 'default' |
| imageSize | 图片大小 | string | '160px' |
| description | 描述文字 | string | '暂无数据' |
| customImage | 自定义图片 URL | string | - |
| imageWidth | 图片宽度 | string | '160px' |
| imageHeight | 图片高度 | string | '160px' |
| descriptionColor | 描述文字颜色 | string | '#969799' |
| descriptionFontSize | 描述文字大小 | string | '14px' |
| bottomMarginTop | 底部内容上边距 | string | '24px' |
| showImage | 是否显示图片 | boolean | true |
| showDescription | 是否显示描述文字 | boolean | true |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义底部内容 |
| image | 自定义图片 |
| description | 自定义描述 |
``` 