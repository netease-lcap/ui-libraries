## Context

封装层需统一块级与行内的宽度语义，并与 `--el-input-width` 等主题变量对齐。块级侧已实现：`fit-content` 移除；左/右标签下 label/content 的 flex 与最小宽度；`content` 直接子节点对白名单控件（如 `.el-input`、`.el-select`、`.el-date-editor` 等）`width: 100%`，单选/多选组不强制拉满。行内侧需补充：**与块级相同的首选宽度（label 96px + content 240px，令牌化）、相同最小宽度（label 72px + content 180px）、先在同一行内收缩再换行**。

## Goals / Non-Goals

**Goals:**

- 块级与行内：**同一套首选与最小宽度令牌**；行内通过容器 **flex + `flex-wrap`** 实现「收缩至最小后换行」。
- 行内不再单独维护一套「更窄」的默认内容宽（如 220），消除与 240 的割裂。
- `content` 内控件铺满规则：**白名单**（与实现保持一致），避免 `*` 误伤 radio/checkbox 组等。

**Non-Goals:**

- 不改变 Element Plus 上游源码。
- 栅格布局（`el-form-grid`）、查询表单复合场景的专用样式可作为后续变更。
- `label-position: top` 与 `inline`  simultaneous 的极端组合：按需另行约定（EP 自有分支）。

## Decisions

1. **令牌宿主仍以 `.el-form`（及主题 `vars.css`）为主**  
   定义如 `--el-form-label-width`（首选 96）、`--el-form-label-min-width`（72）、`--el-form-content-width`（首选 240）、`--el-form-content-min-width`（180）；具体命名以实现为准，与设计令牌表一致。

2. **行内与块级数字对齐**  
   每项 **首选**：label 96px + content 240px（与块级一致）。**最小**：label 72px + content 180px（与块级一致）。`--el-form-inline-content-width` **等同于或与 `--el-form-content-width` 同值/别名**，文档注明废弃单独 220 默认。

3. **行内容器布局**  
   `.el-form.el-form--inline`（在非 label-top 或统一约定分支）使用 **`display: flex; flex-wrap: wrap`**（或与 EP 协同的等价写法），子项 `.el-form-item` 为 flex 子项，设 **`flex-shrink: 1`** 与 **`min-width`**（基于上述最小宽度 + EP padding/margin），以实现：**横向空间变窄时先收到最小，再换行**。

4. **块级 content 内控件：白名单 `width: 100%`**  
   仅对白名单根类名生效（如 `.el-autocomplete`、`.el-cascader`、`.el-date-editor`、`.el-input`、`.el-textarea`、`.el-input-tag`、`.el-mention`、`.el-select`、`.el-slider`、`.el-tree-select`；按需扩展 `el-input-number`、`el-upload`、`el-transfer` 等）。**不包含** `.el-radio-group`、`.el-checkbox-group` 及项目内 `cw-radio-group` / `cw-checkbox-group`。

5. **纵向内容与 `--el-input-width` 对齐**  
   默认 `--el-input-width`（及 select/date-editor 等同级变量）与 `--el-form-content-width` 同源或相等，避免「槽宽 240、控件 220」错位。

## Risks / Trade-offs

- **[Risk]** 行内改为 flex 容器可能与 EP 默认 `inline-flex` 表单项布局叠加，需 Storybook 逐项核对间距与对齐。  
  **Mitigation**：缩小变更范围到左右标签行内；用 Story 固定验收。
- **[Risk]** 依赖旧「行内更窄」或依赖不换行的页面视觉变化。  
  **Mitigation**：BREAKING 说明 + 变量覆盖迁移。
- **[Trade-off]** 与白名单维护成本：新增表单控件时需决定是否加入列表。

## Migration Plan

1. Storybook：块级、行内、窄容器触发换行。
2. 旧项目：在表单根或主题覆盖 `--el-form-content-width` 等恢复近似旧貌。
3. 回滚：Git revert 对应样式提交。

## Open Questions

- （已决）默认首选：**label 96px、content 240px**；最小：**72px / 180px**；行内与块级一致。  
- `label-top` + `inline` 是否在本变更一并约束：**建议延后**，先完成左右标签行内。
