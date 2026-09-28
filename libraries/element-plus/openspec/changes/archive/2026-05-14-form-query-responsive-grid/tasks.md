## 1. API 与类型

- [x] 1.1 在 `el-form` 的 `api.ts` 中明确 `queryForm` 与 `layout` 的组合：`layout === 'grid'` 下列数仅 `columns`；非 grid 且 `queryForm` 时走查询响应式（并在文案中写明）
- [x] 1.2 增加操作区**具名插槽**（`api.ts` + 实现），与文档、Storybook 命名一致

## 2. 布局与响应式

- [x] 2.1 在 `handleLayout`（或等价插件）中分支：`layout === 'grid'` → 沿用 `columns` / `--el-form-columns`，**不**挂查询断点列数；`layout !== 'grid'` 且 `queryForm` → 查询布局根 + `ResizeObserver`，映射 **≥1200→4，992≤w<1200→3，w<992→2**
- [x] 2.2 非 grid 查询模式下用 CSS 变量 / data-attribute 驱动表单项等分列宽（flex 或 grid 子策略，与现有样式体系一致）
- [x] 2.3 非 grid 查询模式下实现操作区 `margin-inline-start: auto`；测量剩余宽度不足时 `flex-basis: 100%` + 行内右对齐，避免操作区碎在字段行之间

## 3. 验证与文档

- [x] 3.1 Storybook：对照 **`layout: grid` + `columns`**（缩窄容器列数不变）与 **非 grid + `queryForm`**（断点 4/3/2）；覆盖 **1200 / 992 / 991** 边界；多按钮操作区换行仍靠右
- [x] 3.2 手动回归：`queryForm` 关闭、以及 grid 模式现有示例无异常（栅格示例已补横向 resize，其余用例未改行为）

## 4. 收尾

- [x] 4.1 自检场景覆盖 `specs/form-query-layout/spec.md` 中的 WHEN/THEN
- [x] 4.2 运行项目要求的 lint/测试命令并修复本变更引入的问题
