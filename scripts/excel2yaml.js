const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');
const { components, components0 } = require('./common/loadComponents');

XlsxPopulate.fromBlankAsync().then((workbook) => {
    // 分析 excel

    // 生成 YAML
    components.forEach((component) => {
        component.subs.forEach((sub) => {
            ['next', 'nested', 'accept-parent', 'control', 'is-sub', 'nexted'].forEach((key) => {
                if (sub.hasOwnProperty(key))
                    delete sub[key];
            });
        });
        fs.writeFileSync(component.yamlPath, YAML.stringify(component.subs));
    });
});
