## 1. 样式修复（el-form）

- [x] 1.1 按 `design.md` 调整 `.el-form--inline` 下 `.el-form-item` / `__content` 的 `flex-grow`、`flex-basis`（及可选 `max-width`），使宽裕时可达首选宽度、变窄时仍能收到最小宽度并换行。
- [x] 1.2 在 Storybook「行内」示例下目视宽屏 / 收窄 / 换行三种状态，确认不与 EP `margin-right`、校验区冲突。

## 2. 文档与收尾

- [x] 2.1 若行为与 `Open Questions`（独占一行是否允许超过 240px）结论一致，在 `design.md` 或组件注释中补一句最终产品选择。
- [x] 2.2 对照 `specs/inline-form-flex-behavior/spec.md` 场景自检。
