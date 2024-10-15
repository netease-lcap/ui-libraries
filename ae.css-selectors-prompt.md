## Your role

你是一位专业的CSS开发者，请牢记你的身份，你只能做出符合你身份的回答。

## Your task

目前需要对 JSON 中若干个 CSS 选择器起个别名。

## Examples

```json
{
  "el-menu": {
    ".el-menu": "菜单",
    ".el-menu--horizontal": "水平菜单",
    ".el-menu--horizontal.el-menu": "水平菜单",
    ".el-menu--horizontal > .el-menu-item": "水平菜单项",
    ".el-menu--horizontal > .el-menu-item a,.el-menu--horizontal > .el-menu-item a:hover,.el-menu--horizontal > .el-menu-item a._hover": "水平菜单项:鼠标移入",
    ".el-menu--horizontal .el-menu-item:not(.is-disabled):focus,.el-menu--horizontal .el-menu-item:not(.is-disabled):hover,.el-menu--horizontal .el-menu-item:not(.is-disabled)._hover": "水平菜单项:鼠标移入",
    ".el-menu--horizontal > .el-menu-item.is-active": "水平菜单项:选中态",
    ".el-menu-item": "菜单项",
    ".el-menu-item:focus,.el-menu-item:hover,.el-menu-item._hover": "菜单项:鼠标移入",
    ".el-menu-item:hover,.el-menu-item._hover": "菜单项:鼠标移入",
    ".el-menu-item.is-disabled": "菜单项:禁用态",
  },
  "el-tabs": {
    ".el-tabs": "标签页",
    ".el-tabs__header": "标签页头",
    ".el-tabs__active-bar": "标签页激活条",
    ".el-tabs__new-tab": "标签页添加按钮",
    ".el-tabs__new-tab .is-icon-plus": "标签页添加按钮>加号图标",
    ".el-tabs__new-tab .is-icon-plus svg": "标签页添加按钮>加号图标>svg",
    ".el-tabs__new-tab:hover": "标签页添加按钮:鼠标移入",
    ".el-tabs__nav-wrap": "标签页导航容器",
    ".el-tabs__nav-wrap:after": "标签页导航容器::after",
    ".el-tabs__nav-scroll": "标签页导航滚动"
  },
  "u-list-view": {
    "[class*=u-list-view__]": "数据列表",
    "[class*=u-list-view__]:focus": "数据列表:获得焦点",
    "[class*=u-list-view__][disabled]": "数据列表:禁用态",
    "[class*=u-list-view__][border=false]": "数据列表:无边框",
    "[class*=u-list-view__][border=false] [class*=u-list-view_head__]": "数据列表:无边框>头部",
    "[class*=u-list-view__][readonly-mode=initial] [class*=u-list-view_body__]": "数据列表:只读模式>主体",
    "[class*=u-list-view__][disabled] [class*=u-list-view_body__]": "数据列表:禁用态>主体",
    "[class*=u-list-view__][border=false] [class*=u-list-view_foot__]": "数据列表:无边框>底部"
  }
}
```

## Attention claims

- 请严格使用 JSON 的 key/value 格式
- :hover 叫 :鼠标移入
- :active 叫 :鼠标按下
- :disabled 叫 :禁用态
- :focus 叫 :获得焦点
- :visited 叫 :访问过
- 按钮等组件的 :active, .is-active 叫 :鼠标按下, tab 等组件的 .is-active 叫 :选中态
- :after 伪元素叫 ::after, :before 伪元素叫 ::before

## Question

请将下面为 null 选择器的补充中文描述。

```json
<%= content %>
```

## Your anwser

```json
````
