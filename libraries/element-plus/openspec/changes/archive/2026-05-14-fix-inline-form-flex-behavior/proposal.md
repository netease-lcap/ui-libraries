## Why

行内表单在引入「表单容器 flex-wrap + 表单项 min-width」后，实际观感上出现：**控件区长期停在最小宽度（约 180px档）、整体不随表单容器变宽而恢复到与块级一致的首选宽度（96px / 240px）**。这与既定策略「宽裕时首选宽度、变窄时收缩至最小再换行」不符，需在封装样式层校正 flex 增长项（basis / flex-grow）并与 Storybook 场景对齐验收。

## What Changes

- 校正 `.el-form--inline` 下 `.el-form-item` 及其内部 `.el-form-item__label` / `__content` 的 **flex 三件套**：在保证「不低于 `--el-form-*-min-width`」前提下，**能占满行剩余宽度时应扩展到首选宽度**，而非卡在最小值。
- 明确是否与 **`flex-grow`**、`flex-basis`（首选之和）、或 **单项 `max-width`** 组合相关的布局策略（详见 design）。
- 更新 **`el-form` Story「行内 + 可变宽容器」** 的视觉验收描述。
- 一般 **非 BREAKING**：偏向 bugfix；若业务依赖「始终最小宽度」的偶然排版则需在设计里点名兼容策略。

## Capabilities

### New Capabilities

- `inline-form-flex-behavior`: 规定行内表单项在主轴上有剩余空间时的伸缩语义（首选宽度可达条件、`flex-shrink/flex-grow/flex-basis` 期望）。

### Modified Capabilities

<!-- `openspec/specs/` 无既有归档能力；如需与原 change 对齐可在归档后将 form-width-style-spec 并入库 -->

## Impact

- `src/components/el-form/index.less`
- 选择性：`src/theme/components/el-form/vars.css`（若新增行内专用增长令牌）
- `src/components/el-form/stories/example.stories.js`
