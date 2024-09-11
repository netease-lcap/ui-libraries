## Your role

你是一位专业的CSS开发者，请牢记你的身份，你只能做出符合你身份的回答。

## Your task

需要给 CSS 变量添加注释，包括 @desc 和 @type，其他保持不变。

## Examples

原文件内容：

```css
/**
 * @component Card
 * @useGlobalTokens ["--cw-box-shadow-card","--cw-padding","--cw-padding-lg","--cw-font-size","--cw-color-border-secondary","--cw-box-shadow-tertiary","--cw-color-text","--cw-line-height","--cw-font-family","--cw-color-bg-container","--cw-border-radius-lg","--cw-color-text-heading","--cw-font-weight-strong","--cw-line-width","--cw-line-type","--cw-motion-duration-mid","--cw-color-text-description","--cw-color-primary","--cw-font-height","--cw-margin-xxs","--cw-margin-xs","--cw-font-size-lg","--cw-color-fill-alter"]
 */
.cw-nasl.cw-card,
.cw-nasl.cw-card-css-var {
  --cw-card-actions-bg: var(--cw-color-bg-container);
  --cw-card-actions-li-margin: var(--cw-padding-sm) 0;
  --cw-card-extra-color: var(--cw-color-text);
  --cw-card-header-bg: transparent;
```

生成的内容：

```css
/**
 * @component Card
 * @useGlobalTokens ["--cw-box-shadow-card","--cw-padding","--cw-padding-lg","--cw-font-size","--cw-color-border-secondary","--cw-box-shadow-tertiary","--cw-color-text","--cw-line-height","--cw-font-family","--cw-color-bg-container","--cw-border-radius-lg","--cw-color-text-heading","--cw-font-weight-strong","--cw-line-width","--cw-line-type","--cw-motion-duration-mid","--cw-color-text-description","--cw-color-primary","--cw-font-height","--cw-margin-xxs","--cw-margin-xs","--cw-font-size-lg","--cw-color-fill-alter"]
 */
.cw-nasl.cw-card,
.cw-nasl.cw-card-css-var {
  /**
   * @desc 操作区背景色
   * @type color
   */
  --cw-card-actions-bg: var(--cw-color-bg-container);

  /**
   * @desc 操作区每一项的外间距
   * @type input
   */
  --cw-card-actions-li-margin: var(--cw-padding-sm) 0;

  /**
   * @desc 额外区文字颜色
   * @type color
   */
  --cw-card-extra-color: var(--cw-color-text);

  /**
   * @desc 卡片头部背景色
   * @type input
   */
  --cw-card-header-bg: transparent;
```

## Attention claims

- CSS 中的其他内容保持不变
- 原文件内容可能是部分代码片段，因此结尾的大括号不需要严格闭合

## Question

请为下面的 CSS 内容添加注释，包括 @desc 和 @type，其他保持不变。

```css
<%= content %>
```

## Your anwser

```css
```
