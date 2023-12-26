# Lcap UI

CodeWave Low Code AI Platform UI Components

## Get Start
此仓库使用 [pnpm](https://pnpm.io/zh/installation) 来进行包管理

```bash
pnpm install

pnpm start
```

## 代码提交规范

```bash
pnpm commit
```

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

由三个字段组成：type（必需）、scope（可选）、subject（必需）

* Type type 必须是下面的其中之一：
  * feat: 增加新功能
  * fix: 修复 bug
  * docs: 只改动了文档相关的内容
  * style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
  * refactor: 代码重构时使用，既不是新增功能也不是代码的bud修复
  * perf: 提高性能的修改
  * test: 添加或修改测试代码
  * build: 构建工具或者外部依赖包的修改，比如更新依赖包的版本
  * ci: 持续集成的配置文件或者脚本的修改
  * chore: 杂项，其他不需要修改源代码或不需要修改测试代码的修改
  * revert: 撤销某次提交

* scope
用于说明本次提交的影响范围。scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。

* subject
主题包含对更改的简洁描述：

注意三点：
1. 使用祈使语气，现在时，比如使用 "change" 而不是 "changed" 或者 ”changes“
2. 第一个字母不要大写
3. 末尾不要以.结尾

* Body
主要包含对主题的进一步描述，同样的，应该使用祈使语气，包含本次修改的动机并将其与之前的行为进行对比。

* Footer
包含此次提交有关重大更改的信息，引用此次提交关闭的issue地址，如果代码的提交是不兼容变更或关闭缺陷，则Footer必需，否则可以省略。



## 资源

* [pnpm](https://pnpm.io/zh/installation)
* [vite](https://vitejs.dev/)
* [vitest](https://cn.vitest.dev/guide/)
* [storybook](https://storybook.js.org/docs/get-started/install)
* [rspack](https://www.rspack.dev/)
