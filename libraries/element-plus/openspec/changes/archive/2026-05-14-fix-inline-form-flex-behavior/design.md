## Context

当前 `index.less` 中行内分支将 `.el-form` 设为 `flex-wrap`，`.el-form-item` 仅显式设置 `flex-shrink: 1` 与 `min-width`，**未给出明确的 flex-basis / flex-grow**（等价于 `flex: 0 1 auto`）。内部 `.el-form-item__label`、`.el-form-item__content` 均为 **`flex-grow: 0`**（`flex: 0 1 …`）。当同一行存在剩余主轴空间时，**多余宽度不会被 label/content 吸收**，再配合 `content` 内控件 **`width: 100%`** 等比例解析，易出现视觉上长期贴近 **最小宽度**、不随表单变宽回到 **首选 96 / 240** 的现象。

## Goals / Non-Goals

**Goals:**

- 行内在「单行尚有剩余宽度」时，表单项应能展开至与设计令牌一致的 **首选宽度**（默认合计约 label 96 + gap + content 240）；仅在容器变窄时向下收到 **最小宽度**，再继续则换行。
- 保持既有：**不换行前的 shrink 顺序**与 **`min-width` 下限**。

**Non-Goals:**

- 不在此变更内重做栅格、查询表单模式。
- 不在此变更内改变块级布局路径（除非共享 mixin 抽取）。

## Decisions

1. **为行内 `.el-form-item__content` 启用可控增长**  
   - **做法**：在 `.el-form--inline` 下将 content 设为 **`flex-grow: 1`**（例如 `flex: 1 1 var(--el-form-content-width, 240px)`），并保留 **`min-width`**；必要时用 **`max-width: var(--el-form-content-width)`** 或等价约束防止单行一项时被无限拉长（若产品希望「独占一行时仍可铺满」，则可不设 max，仅_cap 在多项并行时仍首选——需在实现与 Story 二选一）。  
   - **理由**：首选宽度主要由控件区承担，`grow` 放在 content 比平均拉大整个 item 更符合表单观感。  
   - **备选**：给外层 `.el-form-item` 固定 **`flex-basis: calc(label_pref + gap + content_pref)`** 且 **`flex-grow: 0`**——对「多项平分剩余空间」支持较弱。

2. **外层 `.el-form-item` 明确 flex-basis**  
   - **做法**：建议设为 **`flex: 0 1 auto`** 显式化，或 **`flex: 0 1 calc(...pref...)`** 使单项在未拥挤时占用首选宽度；避免依赖浏览器对 `auto` 与嵌套 `%` 宽度的歧义解析。  
   - **理由**：减少「item 主轴尺寸由子项 min-content 绑架」导致的塌缩。

3. **Storybook 验收**  
   - 「行内 + resize 容器」在 **宽屏** 下截图/目测：多项应接近 **240px 控件区**；逐步收窄应先缩再起 **换行**。

## Risks / Trade-offs

- **[Risk]** `flex-grow: 1` + `width:100%` 子控件在「单项独占宽行」时拉得过宽 → **Mitigation**：`max-width` 或 Story 明确产品偏好。  
- **[Risk]** 与 EP 默认 `margin-right`、校验提示占位叠加 → **Mitigation**：Story 覆盖典型字段。

## Migration Plan

1. 合并后跑 Storybook「行内」示例与关键业务页快照（若有）。  
2. 回滚：还原 `index.less` 行内相关 flex 块。

## Open Questions

- ~~「单行仅一项」时 content 是否允许超过 **240px**~~ **已定**：行内不设 `max-width` 截断 content；单项占位由外层 `flex-basis`（首选之和）约束，`flex-grow: 1` 的 content 仅在表单项内部填满残留宽度（一般不会远大于首选列）。筛单项若要铺满整行需在业务布局层面拉大表单或单列再放控件。
