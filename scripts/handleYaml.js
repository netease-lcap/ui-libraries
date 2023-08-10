const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');
const { components, components0 } = require('./common/loadComponents');

const filePath = path.join(__dirname, `./组件总表from交互.xlsx`)

XlsxPopulate.fromFileAsync(filePath).then((workbook) => {
    // 生成 YAML
    components.forEach((component) => {
        component.subs.forEach((sub) => {
            ['next', 'nested', 'accept-parent', 'control', 'is-sub', 'nexted'].forEach((key) => {
                if (sub.hasOwnProperty(key))
                delete sub[key];
                sub.attrs?.forEach((attr) => {
                    delete attr.brifeDoc;
                });
            });
        });
        fs.writeFileSync(component.yamlPath, YAML.stringify(component.subs));
    });
});
