const fs = require('fs-extra');
const path = require('path');
const ts2json = require('./ts2json');

/**
 * - attr
 * - event
 * - method
 * - slot
 */
const pcComponents = require(`../../pc-ui/scripts/lcap/config`);
pcComponents.forEach((component) => {
    let tsPath = path.join(__dirname, `../../pc-ui/src/components/${component.name}.vue/api.ts`);
    component.frontend = 'pc';
    component.tsPath = tsPath;
    component.subs = [];
    try {
        component.subs = ts2json.transform(fs.readFileSync(tsPath, 'utf8'));
    } catch (e) {
        console.log('找不到 TS 文件或 TS 报错', tsPath);
        console.log(e);
    }
});
const h5Components = require(`../../h5-ui/scripts/lcap/config`);
h5Components.forEach((component) => {
    let tsPath = path.join(__dirname, `../../h5-ui/src/${component.name}/api.ts`);
    if (!fs.existsSync(tsPath))
        tsPath = path.join(__dirname, `../../h5-ui/src-vusion/components/${component.name}/api.ts`);
    component.frontend = 'h5';
    component.tsPath = tsPath;
    component.subs = [];
    try {
        component.subs = ts2json.transform(fs.readFileSync(tsPath, 'utf8'));
    } catch (e) {
        console.log('找不到 TS 文件或 TS 报错', tsPath);
        console.log(e);
    }
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
