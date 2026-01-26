# 2026-01-01 ~ 2026-01-31

## ElementPlus

### Features

- feat(el-upload): 为上传组件添加 action 属性，默认值为 '/upload' ([a35e2b3](../../commit/a35e2b3))
- feat(el-button, el-form, el-menu): 为按钮、表单和菜单组件添加聚焦、失焦事件及样式属性 ([b04e23b](../../commit/b04e23b))
- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))
- feat(api): 为多个组件添加必填属性的条件逻辑 ([6cab599](../../commit/6cab599))

### Bug Fixes

- fix(ide): elementplus date remove valueFormat ([a5e5b5f](../../commit/a5e5b5f))
- fix(el-date-picker, el-radio): 优化日期选择器和单选框组件的处理逻辑 ([669804a](../../commit/669804a))
- fix(el-checkbox, el-radio): 添加默认类型属性以优化组件预览 ([ef262d3](../../commit/ef262d3))
- fix(el-select): 修复插件逻辑，简化 remoteMethod 函数参数 ([396cfd3](../../commit/396cfd3))
- fix(el-date-picker): 优化日期选择器中 valueFormat 的处理逻辑 ([bacd616](../../commit/bacd616))
- fix(el-date-picker): 修复日期选择器中 modelValue 的处理逻辑 ([af4e72a](../../commit/af4e72a))
- fix(el-select): 修复插件逻辑，使用 useRef 处理数据源引用 ([252fb53](../../commit/252fb53))
- fix(el-date-picker): 在日期选择器中添加多个年份选项 ([5b215f1](../../commit/5b215f1))
- fix(el-flex, el-select, van-rate): 更新示例故事和插件逻辑，修复预览属性的处理 ([b55458b](../../commit/b55458b))
- fix(el-link, el-select): 注释掉失焦事件并更新数据加载成功时的描述信息 ([2fa6207](../../commit/2fa6207))
- fix(van-checkbox, van-radio): 更新样式以处理未选中状态的显示逻辑 ([3c4badb](../../commit/3c4badb))
- fix(el-checkbox): 删除不再使用的样式文件并更新导入路径 ([b74bc77](../../commit/b74bc77))
- fix(el-form, el-input-number, el-link, el-select): 修复插件中对默认函数的处理逻辑 ([4872ede](../../commit/4872ede))
- fix(el-select): 修改数据加载前触发的描述信息 ([ed6f192](../../commit/ed6f192))
- fix(el-tabs): 更新关闭事件的描述信息 ([919d4e6](../../commit/919d4e6))
- fix(el-table): 修改排序属性和排序字段的名称 ([a48e372](../../commit/a48e372))
- fix(el-pagination): 优化分页组件的页面大小处理逻辑 ([76a2a8d](../../commit/76a2a8d))
- fix(vant-components): 添加预览属性到多个组件并更新相关逻辑 ([80baa90](../../commit/80baa90))
- fix(el-select): 修复el-select组件的默认插槽渲染逻辑和远程方法属性的默认值 ([c2d879d](../../commit/c2d879d))
- fix(el-flex): 修复flex模式下的子组件渲染逻辑 ([fcac024](../../commit/fcac024))
- fix(el-date-picker): 更新日期选择器选项顺序和内容 ([bc40f22](../../commit/bc40f22))
- fix(el-icon): 修复图标组件传递props的问题并优化SVG处理逻辑 ([cf5463f](../../commit/cf5463f))
- fix(el-upload): 添加文件上传组件的清空功能和图标自定义 ([466fce2](../../commit/466fce2))
- fix(el-flex): 修复flex模式下的子组件渲染逻辑 ([bf87051](../../commit/bf87051))
- fix(el-date-picker): 更新值类型转化属性的描述和选项 ([5b26798](../../commit/5b26798))
- fix(el-date-picker): 更新日期选择器的类型和添加值类型转化属性 ([3fe41f5](../../commit/3fe41f5))
- fix(ElPreview): eltext改为elementplus组件 ([547a892](../../commit/547a892))
- fix: more log" ([d1c899b](../../commit/d1c899b))
- fix(datePick): time json ([3249a95](../../commit/3249a95))
- fix(el-date-picker): 修复日期选择器的值格式设置逻辑 ([a4ec1a2](../../commit/a4ec1a2))
- fix(el-list): 修复翻页设置,修复 table order emit 映射 ([abefa9f](../../commit/abefa9f))
- fix(el-table): 修复动态列 nodepath 删除的问题 ([a028660](../../commit/a028660))

### Other

- refactor(el-radio): 移除 CSS 文件并更改为 LESS 文件，优化组件样式管理 ([e73a3d8](../../commit/e73a3d8))
- refactor(mcpTool): 更新工具结构，调整输出模式以支持返回类型和文本 ([3ce469a](../../commit/3ce469a))

## ElementUI

### Features

- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))

## MobileUI

### Features

- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))
- Feat text overflow (#1315) ([955a1dc](../../commit/955a1dc))
- feat: Vue2 form disabled (#1314) ([512215a](../../commit/512215a))

### Bug Fixes

- fix(ULink): 区分链接类型，加载不同路径前缀 ([7dc7919](../../commit/7dc7919))
- fix(VanButton): 表单禁用支持 ([ea00a1b](../../commit/ea00a1b))
- fix(mobile-ui/uploader): 事件file属性类型还原，新增rawFile属性 (#1316) ([eddba97](../../commit/eddba97))

## PcReactUI

### Features

- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))

## PcUI

### Features

- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))
- Feat text overflow (#1315) ([955a1dc](../../commit/955a1dc))
- feat: Vue2 form disabled (#1314) ([512215a](../../commit/512215a))

### Bug Fixes

- fix(UTableViewCoulmn): ideusgae 去掉forceUpdateWhenAttributeChange (#1328) ([ac1adf8](../../commit/ac1adf8))
- fix(u-table-view): 修改排序方式的标题为“排序顺序” ([12ed3f0](../../commit/12ed3f0))
- fix(UTableView): 表格设置高度100%和padding时高度计算修正 (#1312) ([43ea948](../../commit/43ea948))
- fix(ULink): 区分链接类型，加载不同路径前缀 ([7dc7919](../../commit/7dc7919))
- fix(USelect): 宽度不够时，多选不显示tag 问题修复 ([7ca6fab](../../commit/7ca6fab))

## Vant

### Features

- feat: rate block ([5628729](../../commit/5628729))
- feat(All): dataSource属性由bindOpen改为DataSourceSetter (#1318) ([ee1f01d](../../commit/ee1f01d))

### Bug Fixes

- fix(van-field): 修复输入处理逻辑，添加 modelValue 处理 ([440f8cf](../../commit/440f8cf))
- fix(van-rate): 更新评分组件的 setter 类型为 InputSetter ([2c63b60](../../commit/2c63b60))
- fix(van-uploader): 修复预览属性处理逻辑并更新示例故事 ([097238a](../../commit/097238a))
- fix(el-flex, el-select, van-rate): 更新示例故事和插件逻辑，修复预览属性的处理 ([b55458b](../../commit/b55458b))
- fix(van-checkbox, van-radio): 更新样式以处理未选中状态的显示逻辑 ([3c4badb](../../commit/3c4badb))
- fix(constants): 在样式常量中添加背景属性 ([7674dc0](../../commit/7674dc0))
- fix(vant-plugin): 增强组件卸载时的资源清理逻辑，防止内存泄露 ([eda6e3c](../../commit/eda6e3c))
- fix(van-stepper-number): 添加预览属性并调整禁用属性的描述 ([fa61ea1](../../commit/fa61ea1))
- fix(el-table): 修改排序属性和排序字段的名称 ([a48e372](../../commit/a48e372))
- fix(vant-components): 移除多个组件中的预览导入语句 ([753d87d](../../commit/753d87d))
- fix(el-pagination): 优化分页组件的页面大小处理逻辑 ([76a2a8d](../../commit/76a2a8d))
- fix(vant-components): 添加预览属性到多个组件并更新相关逻辑 ([80baa90](../../commit/80baa90))

## Other

### Features

- feat: 主题高级样式支持搜索全组件选择器 (#1325) ([a45560a](../../commit/a45560a))
- feat(validator): 添加 regex 验证规则 (#1311) ([f4d7c42](../../commit/f4d7c42))

### Bug Fixes

- fix(USelect): 宽度不够时，多选不显示tag 问题修复 (#1319) ([97b885f](../../commit/97b885f))


---

# 2025-10-01 ~ 2025-10-31

## ElementPlus

### Features

- feat(ide): ide block add directory, directory name should be lowercase ([3cccf6e](../../commit/3cccf6e))
- feat(el-list-components): 添加无限滚动支持，优化分页逻辑 ([2ea39f4](../../commit/2ea39f4))
- feat(el-list-components): 更新分页逻辑，支持自动加载更多和分页选项 ([54cfe58](../../commit/54cfe58))
- feat(el-upload): 添加文件禁用状态支持 ([6a8bff5](../../commit/6a8bff5))
- feat(el-breadcrumb, el-menu, el-link, el-checkbox): 插件 router key 改造为 Symbol 避免命名冲突 ([10f104c](../../commit/10f104c))
- feat(el-list-components, el-date-picker): enhance list components ([6676cf2](../../commit/6676cf2))
- feat(Theme): 模板页面UI优化 ([7dbb8a0](../../commit/7dbb8a0))
- feat(el-list-components): enhance list components with pagination and selection features; ([70e7c4c](../../commit/70e7c4c))
- feat(el-form, el-select, el-upload): add trigger prop for validation, ([e43c0dd](../../commit/e43c0dd))
- feat(ide): ide block add directory (#1275) ([cde90d5](../../commit/cde90d5))
- feat(el-radio, el-table): enhance radio group layout ([55cd802](../../commit/55cd802))
- feat(el-table): add forceRefresh and table component behavior ([da00d37](../../commit/da00d37))
- feat(date-picker): add minDate and maxDate properties, enhance date selection functionality ([1d44d27](../../commit/1d44d27))
- feat: 添加插件路径映射，更新 IDEExtraInfo 接口以支持 disableOverLoad 属性，优化 ElButton 组件导出结构 ([bd078ea](../../commit/bd078ea))

### Bug Fixes

- fix(el-list-components): 修复选择模式属性获取逻辑，优化插件集成测试用例 ([cee6c1f](../../commit/cee6c1f))
- fix(el-form): 修复表单项插件触发器处理逻辑 ([5be443c](../../commit/5be443c))
- fix(el-form): 修复表单项插件未定义触发器时的行为 ([8e2e8bc](../../commit/8e2e8bc))
- fix(el-dialog): 修复对话框关闭前的回调处理逻辑 ([e7403a3](../../commit/e7403a3))
- fix(el-button): remote register ([a90843c](../../commit/a90843c))

### Other

- refactor(el-plugins): 优化插件属性合并方式，调整组件插槽处理逻辑 ([69604e0](../../commit/69604e0))
- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))
- refactor(el-checkbox, el-radio): 移除不必要的 ref 属性，优化组件属性传递方式 ([8b8eae1](../../commit/8b8eae1))
- refactor(el-checkbox, el-radio): 统一选中值属性的定义，优化文档描述 ([91478cc](../../commit/91478cc))
- refactor(el-plugins): 优化插件属性引用方式，调整测试用例以提高可读性 ([c1a35cd](../../commit/c1a35cd))
- refactor(el-components): 统一组件属性分组，优化描述和文档说明 ([273a075](../../commit/273a075))
- refactor(el-table): 优化表格组件属性分组和结构，移除冗余属性 ([5866c59](../../commit/5866c59))
- refactor(el-list-components): 重构组件注册逻辑，移除不必要的导出 ([834638e](../../commit/834638e))
- refactor(el-menu): 重命名api autoRouter 为 auto 增加语义性 ([7c2466d](../../commit/7c2466d))

## ElementUI

### Features

- feat(ide): ide block add directory, directory name should be lowercase ([3cccf6e](../../commit/3cccf6e))
- feat(ide): ide block add directory (#1275) ([cde90d5](../../commit/cde90d5))

### Other

- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))

## MobileUI

### Features

- feat(ide): ide block add directory, directory name should be lowercase ([3cccf6e](../../commit/3cccf6e))
- feat(ide): ide block add directory (#1275) ([cde90d5](../../commit/cde90d5))

### Other

- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))
- chore(builder): extenal vue composition api ([e9a9897](../../commit/e9a9897))

## PcReactUI

### Features

- feat(ide): ide block add directory, directory name should be lowercase ([3cccf6e](../../commit/3cccf6e))
- feat(ide): ide block add directory (#1275) ([cde90d5](../../commit/cde90d5))

### Other

- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))

## PcUI

### Features

- feat(ide): ide block add directory, directory name should be lowercase ([3cccf6e](../../commit/3cccf6e))
- feat(ide): ide block add directory (#1275) ([cde90d5](../../commit/cde90d5))

### Bug Fixes

- fix(UTableView): 表格分组下固定列下显隐控制后表头错位 ([890754d](../../commit/890754d))
- [Bug Fix] 修复级联选择器 &  导航栏的问题 (#1279) ([d6766cb](../../commit/d6766cb))
- fix(UUploader): file remove icon class ([dd20b28](../../commit/dd20b28))

### Other

- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))
- chore(builder): extenal vue composition api ([e9a9897](../../commit/e9a9897))

## Vant

### Features

- feat(Theme): 主题预览页面模板修改 ([18523ed](../../commit/18523ed))

### Other

- chore: upgrade version v4.3.0 ([8b2c899](../../commit/8b2c899))

## Other

### Other

- chore(pipline): add changelog generate script ([670d6c7](../../commit/670d6c7))

