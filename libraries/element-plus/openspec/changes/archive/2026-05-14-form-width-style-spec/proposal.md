## Why

表单相关宽度目前分散在 `el-form`（标签区、内容区）、`el-input`/`el-textarea`、主题变量 `--el-form-inline-content-width` 等多处，数值不一致（例如内容区 240px、行内历史 220px），缺少统一的可见规范与可覆盖的设计令牌。行内与块级若各用一套数字，画布与设计稿对齐成本高；行内布局若仅靠 EP 默认 inline 排列，也难以稳定实现「先收缩到统一最小宽度再换行」的行为。

## What Changes

- 建立「表单宽度」规范：**块级与行内共用同一套首选与最小宽度**（标签 / 控件区），差异仅在排列与容器（行内需 `flex-wrap` 等）。
- 用 CSS 自定义属性集中暴露默认值；**行内内容宽度与块级同源**，`--el-form-inline-content-width` 与内容区令牌对齐或作为别名，取消「220 vs 240」隐性分叉。
- **块级**：左/右标签下 `label` / `content` 的 flex 与最小宽度；`content` 内对录入类控件采用**白名单** `width: 100%`（单选/多选组等除外）。
- **行内**：表单容器采用可与 EP 协同的 **flex + `flex-wrap`** 策略；每项首选仍为 label 96px + content 240px（令牌化），收缩下限与块级一致（如 label min 72px、content min 180px），**先到最小仍放不下再换行**。
- 梳理 `el-form`、`el-form-item`、主题 `vars.css` 及相关控件默认宽度；补充 Storybook（含行内缩窄与换行演示）。
- 文档化覆盖优先级与潜在 **BREAKING**（依赖旧行内 220px 或旧排列行为的页面）。

## Capabilities

### New Capabilities

- `form-width-style-spec`: 约定块级与行内在标签宽度、内容区宽度、设计令牌、行内换行策略及 content 内控件铺满规则。

### Modified Capabilities

<!-- 当前 `openspec/specs/` 下无既有能力说明，此处留空。 -->

## Impact

- `src/components/el-form/`（`index.less`、`plugins`）
- `src/theme/components/el-form/vars.css`
- `src/components/el-input/`、`el-textarea` 等与 `--el-input-width` 相关的样式
- Story：`el-form` stories（块级、行内、控件示例）
