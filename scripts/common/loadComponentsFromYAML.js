const YAML = require('yaml');
const fs = require('fs-extra');
const path = require('path');

/**
 * - attr
 * - event
 * - method
 * - slot
 */
const pcComponents = require(`../../pc-ui/scripts/lcap/config`);
pcComponents.forEach((component) => {
    let yamlPath = path.join(__dirname, `../../pc-ui/src/components/${component.name}.vue/api.yaml`);
    component.frontend = 'pc';
    component.yamlPath = yamlPath;
    component.subs = YAML.parse(fs.readFileSync(yamlPath, 'utf8'));
});
const h5Components = require(`../../h5-ui/scripts/lcap/config`);
h5Components.forEach((component) => {
    let yamlPath = path.join(__dirname, `../../h5-ui/src/${component.name}/api.yaml`);
    if (!fs.existsSync(yamlPath))
        yamlPath = path.join(__dirname, `../../h5-ui/src-vusion/components/${component.name}/api.yaml`);
    component.frontend = 'h5';
    component.yamlPath = yamlPath;
    component.subs = YAML.parse(fs.readFileSync(yamlPath, 'utf8'));
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

exports.components = components;
exports.components0 = components0;
