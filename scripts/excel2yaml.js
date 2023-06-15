const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');

/**
 * - attr
 * - event
 * - method
 * - slot
 */
const pcComponents = require(`../pc-ui/scripts/lcap/config`);
pcComponents.forEach((component) => {
    let componentPath = path.join(__dirname, `../pc-ui/src/components/${component.name}.vue/api.yaml`);
    component.frontend = 'pc';
    component.componentPath = componentPath;
    component.subs = YAML.parse(fs.readFileSync(componentPath, 'utf8'));
});
const h5Components = require(`../h5-ui/scripts/lcap/config`);
h5Components.forEach((component) => {
    let componentPath = path.join(__dirname, `../h5-ui/src/${component.name}/api.yaml`);
    if (!fs.existsSync(componentPath))
        componentPath = path.join(__dirname, `../h5-ui/src-vusion/components/${component.name}/api.yaml`);
    component.frontend = 'h5';
    component.componentPath = componentPath;
    component.subs = YAML.parse(fs.readFileSync(componentPath, 'utf8'));
});
/**
 * PC、H5 按组对齐，用于基本信息展示
 */
let components0 = pcComponents.slice();
h5Components.forEach((item) => {
    let lastIndex = components0.length - 1;
    for (let i = components0.length - 1; i >= 0; i--) {
        const item2 = components0[i];
        if (item2.group === item.group) {
            lastIndex = i;
            break;
        }
    }
    components0.splice(lastIndex + 1, 0, item);
});
/**
 * PC、H5 按名字对齐，方便属性、事件对比
 */
let components = pcComponents.slice();
h5Components.forEach((item) => {
    let lastIndex = components.length - 1;
    for (let i = components.length - 1; i >= 0; i--) {
        const item2 = components[i];
        if (item2.alias === item.alias) {
            lastIndex = i;
            break;
        }
    }
    if (lastIndex === components.length - 1) {
        for (let i = components.length - 1; i >= 0; i--) {
            const item2 = components[i];
            if (item2.group === item.group) {
                lastIndex = i;
                break;
            }
        }
    }
    components.splice(lastIndex + 1, 0, item);
});
XlsxPopulate.fromBlankAsync().then((workbook) => {
    // 分析 excel

    // 生成 YAML
    components.forEach((component) => {
        component.subs.forEach((sub) => {
            ['next', 'nested', 'accept-parent', 'control'].forEach((key) => {
                if (sub.hasOwnProperty(key))
                    delete sub[key];
            });
        });
        fs.writeFileSync(component.componentPath, YAML.stringify(component.subs));
    });
});
