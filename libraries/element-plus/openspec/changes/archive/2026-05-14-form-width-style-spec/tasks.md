## 1. 决策与令牌

- [x] 1.1 在 `vars.css` / design 中固化：**块级与行内**同源的首选宽度（label 96、content 240）与最小宽度（72、180）；`--el-form-inline-content-width` 与 content 令牌对齐或标明别名与废弃说明。
- [x] 1.2 记录对外 **BREAKING**：依赖旧行内默认更窄（如 220）或与「不换行」假设兼容的页面。

## 2. 样式落地（el-form）

- [x] 2.1 `index.less`：将块级已有魔法数字改为引用 CSS 变量（若尚未完成）。
- [x] 2.2 **行内**：为 `.el-form.el-form--inline`（约定标签位置范围内）实现 **flex + `flex-wrap`**，表单项 **`flex-shrink: 1`** 与基于令牌计算的 **`min-width`**，验收「先缩到最小再换行」；避免与 EP 间距规则严重冲突。
- [x] 2.3 块级 **content 白名单**与 design 一致；按需补齐 `.el-input-number`、`.el-upload`、`.el-transfer` 等（仍排除 radio/checkbox 组）。

## 3. 主题与输入族宽度

- [x] 3.1 `--el-input-width`、`--el-select-width`、`--el-date-editor-width` 等与 `--el-form-content-width` 文档化同源关系并在主题中收敛。
- [x] 3.2 核对各控件 `index.css` 未再以固定像素打破表单 content 宽度。

## 4. 验证与文档

- [x] 4.1 Storybook：`el-form` 增加或更新 **行内 + 可变宽度容器**（拖拽或外层 max-width）演示换行与收缩。
- [x] 4.2 对照 `specs/form-width-style-spec/spec.md` 自检。
- [x] 4.3 变更说明 / api 文档中简述覆盖方式与白名单扩展方式。
