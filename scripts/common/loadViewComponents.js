const fs = require('fs-extra');
const path = require('path');

const pcComponents = require('../../pc-ui/dist-theme/nasl.ui.json');
const h5Components = require('../../h5-ui/dist-theme/nasl.ui.json');

pcComponents.forEach((component) => {
    component.frontend = 'pc';
    component.children.unshift(component);
});
h5Components.forEach((component) => {
    component.frontend = 'h5';
    component.children.unshift(component);
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
        if (item2.title === item.title) {
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
