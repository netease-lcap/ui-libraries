# 低代码 UI 组件库汇总

## 组件 API 规范升级

由于组件 API 规范升级影响面较广，所以可能有一段临时态的情况：

```mermaid
flowchart BT
    YAML -- yaml2excel --> Excel
    Excel -- excel2yaml --> YAML
    YAML -- TODO开发 --> dts
    YAML -- scripts/lcap --> usage.json
    Excel -- TODO开发 --> dts
    dts -- TODO开发 --> Excel
    dts -- TODO开发 --> usage.json
    usage.json -- createUiTs --> nasl.ui.definition.ts
    dts -- TODO汇总 --> nasl.ui.definition.ts
```

- [ ] YAML --> dts
- [ ] dts --> Excel
- [ ] dts --> usage.json
- [ ] Excel --> dts
- [ ] 汇总 ui.definition

## 目录

- pc-ui
- h5-ui

## 脚本

### 生成 Excel

```shell
node scripts/yaml2excel.js
```

### 解析 Excel

```shell
node scripts/excel2yaml.js
```