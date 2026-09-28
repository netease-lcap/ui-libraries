## Context

本库对 Element Plus `el-form` 做二次封装，需支持常见「查询表单」：多列表单项 + 右侧（或行尾）操作区。断点需基于**表单根节点内容宽度**（随侧栏折叠、对话框宽度变化），而非仅用视口 `vw`。操作区常含多个按钮，需在空间不足时整块落到下一行且视觉仍靠右。

已与产品对齐：**`layout === 'grid'` 时只做固定列数（`columns`），不走宽度断点；`layout` 为其他值且开启查询表单时，才按查询表单的响应式列数与操作区规则实现。**

## Goals / Non-Goals

**Goals:**

- **`layout === 'grid'`**：列数**只读 `columns`**，不根据宽度在 2/3/4 间自动切换；与 `queryForm` 同时开启时，**断点列数逻辑不得覆盖 `columns`**。
- **`layout !== 'grid'` 且查询表单开启**：依据表单宽度应用列数（**≥1200 → 4，992 ≤ w < 1200 → 3，w < 992 → 2**）。
- 提供**操作区具名插槽**；在**非 grid 的查询布局**下：同一行与表单项共存时操作区**靠右**；**整组操作**无法放入本行剩余空间时**独占下一行**，且**仍靠右**。
- 行为在 Storybook 可演示（含窄容器、多按钮溢出、grid vs 非 grid 对照）。

**Non-Goals:**

- 不修改上游 `element-plus` 源码；不改变非查询模式下既有表单语义（除非为兼容而做极小调整并在任务中单独评估）。
- 不要求支持任意自定义断点阈值的首版实现（首版固定为 1200 / 992）；若后续要可配置，可作为扩展任务。

## Decisions

1. **`layout` 与查询表单分工**  
   - **选用**：`grid` → 仅 `columns`，无响应式断点列数；**其他 `layout` + `queryForm`** → 响应式 4/3/2 + 操作区布局（具名插槽）。  
   - **理由**：避免 `columns` 与断点两套规则冲突；与 IDE 「栅格展示」心智一致。  
   - **`queryForm` + `grid` 并存**：列数以 `columns` 为准；操作具名插槽若需在 grid 下展示，与现有 `.el-form-grid` 网格的 DOM 关系在实现中明确（首版以保证「非 grid + 查询」完整行为为优先）。

2. **宽度观测（仅非 grid 查询布局）**  
   - **选用**：对查询布局根包裹层使用 `ResizeObserver`，读取宽度作为断点输入。  
   - **理由**：与视口无关；grid 模式可不挂断点映射。  
   - **备选**：`matchMedia` — 不适用于嵌套容器。

3. **列数状态**  
   - **选用**：非 grid 查询模式下由宽度映射为 `columns ∈ {2,3,4}`，以 CSS 变量或 data-attribute 驱动子项 `flex-basis` / 等分列宽；grid 模式沿用现有 `--el-form-columns`（来自用户 `columns`）。  
   - **理由**：单一数据源 per 模式，易测试。

4. **表单项与操作区排布（非 grid 查询）**  
   - **选用**：外层 `display: flex; flex-wrap: wrap;`，表单项按列数设 `flex-basis`；操作区包裹层默认 `margin-inline-start: auto`。  
   - **理由**：换行后仍可将操作块推到行尾。

5. **「整块换行」判定**  
   - **选用**：测量首行剩余宽度与操作区宽度；不足则为操作包裹层设 `flex-basis: 100%` + 行内 `justify-content: flex-end`。  
   - **理由**：保证操作区原子换行。

6. **插槽**  
   - **选用**：`api.ts` 中 **`ElForm` 具名插槽**（名称与项目内约定统一，如 `actions`）。  
   - **理由**：低代码/IDE 可显式挂载操作区。

## Risks / Trade-offs

- **[Risk] ResizeObserver + 测量导致布局抖动** → **Mitigation**：`requestAnimationFrame` 合并更新；列数与「独占一行」状态去重。  
- **[Risk] `queryForm` + `grid` 下用户对「查询」预期不一致** → **Mitigation**：文档明确：grid 下列数固定，无 2/3/4 断点切换。  
- **[Risk] SSR / 无 DOM** → **Mitigation**：仅在 `mounted` 后启用观测；首屏非 grid 查询可定默认列数（任务中写明）。

## Migration Plan

- 能力均为可选：`queryForm` 关闭且非 grid 时与现网一致；`layout === 'grid'` 行为与现有 `columns` 一致。  
- 文档说明：`layout` 与 `queryForm` 的组合矩阵。

## Open Questions

- 具名插槽最终名称（与表格工具栏等对齐）实现前 grep 敲定。  
- `queryForm` + `grid` 时是否仍渲染操作插槽容器，或 IDE 禁用该组合，可在实现/产品再定。
