const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');

const groupMap = {
    Layout: '布局',
    Navigation: '导航',
    Container: '容器',
    Display: '展示',
    Table: '表格',
    Form: '表单',
    Selector: '选择器',
    Chart: '图表',
    Feedback: '反馈',
    Effects: '特效',
    Process: '流程',
}

function mergeSameRows(sheet, endColumnNumber) {
    const usedRange = sheet.usedRange();
    let startColumnNumber = usedRange.startCell().columnNumber();
    let startRowNumber = usedRange.startCell().rowNumber();
    endColumnNumber = endColumnNumber || usedRange.endCell().columnNumber();
    let endRowNumber = usedRange.endCell().rowNumber();

    for (let i = startColumnNumber; i <= endColumnNumber; i++) {
        let lastValue;
        let lastRowNumber = 1;
        for (let j = startRowNumber; j <= endRowNumber; j++) {
            const value = sheet.cell(j, i).value();
            if (lastValue && lastValue !== value) {
                j - 1 - lastRowNumber >= 1 && sheet.range(lastRowNumber, i, j - 1, i).merged(true);
                lastRowNumber = j;
            }
            lastValue = value;
        }
        endRowNumber - lastRowNumber >= 1 && sheet.range(lastRowNumber, i, endRowNumber, i).merged(true);
    }

    return usedRange;
}

function mergeRows(sheet, lastNumbers, rowNumber, col, condition) {
    const lastNumber = lastNumbers[col];
    condition = condition || sheet.cell(rowNumber, col).value() !== sheet.cell(rowNumber - 1, col).value();
    if (condition) {
        rowNumber - 1 - lastNumber >= 1 && sheet.range(lastNumber, col, rowNumber - 1, col).merged(true);
        lastNumbers[col] = rowNumber;
    }
}

function collectOtherKeys(obj, otherKeys, excludedKeys) {
    let hasKeys = [];
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (excludedKeys.includes(key))
            return;
        if (!otherKeys.includes(key))
            otherKeys.push(key);
    });
    otherKeys.forEach((key) => {
        hasKeys.push(keys.includes(key) ? key : '');
    });
    return hasKeys;
}

// function escape(str) {
//     // const re = /[^\u3000-\u303f\u4e00-\u9fa5\uf900-\ufa2d\uff01-\uff5ea-zA-Z0-9_\s`"'-_\{\}<>~\.,%]/g;
//     // const cap = re.exec(str);
//     // if (cap)
//     //     console.log(cap[0], cap[0].charCodeAt(0));
//     // return str.replace(re, '_');
//     return str.replace(/[\u0008]/g, '_');
// }

XlsxPopulate.fromBlankAsync().then((workbook) => {
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
        component.subs = YAML.parse(fs.readFileSync(componentPath, 'utf8'));
    });
    const h5Components = require(`../h5-ui/scripts/lcap/config`);
    h5Components.forEach((component) => {
        let componentPath = path.join(__dirname, `../h5-ui/src/${component.name}/api.yaml`);
        if (!fs.existsSync(componentPath))
            componentPath = path.join(__dirname, `../h5-ui/src-vusion/components/${component.name}/api.yaml`);
        component.frontend = 'h5';
        component.subs = YAML.parse(fs.readFileSync(componentPath, 'utf8'));
    });
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
        
    {
        const sheet = workbook.addSheet('组件基本信息');
        const firstRowData = ['分类', '端', '组件名称', '组件标题', '子组件名称', '子组件标题', '图标', '描述'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 22, 18, 30, 14, 18, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components0.forEach((component) => {
            component.subs.forEach((sub) => {
                const hasKeys = collectOtherKeys(sub, otherKeys, ['name', 'title', 'icon', 'description', 'labels', 'attrs', 'slots', 'events', 'methods', 'computed', 'aria']);
                sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                    [groupMap[component.group], component.frontend.toUpperCase(), component.name, component.alias, sub.name, sub.title, sub.icon, sub.description, ...hasKeys.map((key) => key && JSON.stringify(sub[key]))],
                ]);
                [1, 3, 4].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col));
                mergeRows(sheet, lastNumbers, rowNumber, 2, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                         || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                rowNumber++;
            });
        });
        [1, 2, 3, 4].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 4;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }

    {
        const sheet = workbook.addSheet('组件属性汇总');
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '属性分组', '属性名称', '属性标题', '属性描述', '双向绑定（model/sync）', '属性类型', 'default', 'options', 'display', 'bindHide', 'tooltipLink'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 10, 24, 28, 80, 20, 14].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.subs.forEach((sub) => {
                sub.attrs && sub.attrs.forEach((attr) => {
                    if (attr.advanced)
                        return;
                    const hasKeys = collectOtherKeys(attr, otherKeys, ['group', 'name', 'title', 'description', 'model', 'sync', 'type', 'default', 'options', 'display', 'bindHide', 'tooltipLink']);
                    if (/[\u0008]/g.test(attr.description))
                        console.log(sub.title, attr.name);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.alias, sub.title, attr.group || '主要属性', attr.name, attr.title, attr.description, `${attr.model || ''}/${attr.sync || ''}`, attr.type, JSON.stringify(attr.default), JSON.stringify(attr.options), attr.display, attr.bindHide, attr.tooltipLink, ...hasKeys.map((key) => key && JSON.stringify(attr[key]))],
                    ]);
                    [1].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col));
                    mergeRows(sheet, lastNumbers, rowNumber, 2, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 3, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 4, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 5, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value()
                                                            || sheet.cell(rowNumber, 5).value() !== sheet.cell(rowNumber - 1, 5).value());
                    rowNumber++;
                });
            });
        });
        [1, 2, 3, 4, 5].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 5;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }

    {
        const sheet = workbook.addSheet('组件事件汇总');
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '事件名称', '事件标题', '事件描述'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 24, 30, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.subs.forEach((sub) => {
                sub.events && sub.events.forEach((event) => {
                    if (event.advanced)
                        return;
                    const hasKeys = collectOtherKeys(event, otherKeys, ['name', 'title', 'description']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.alias, sub.title, event.name, event.title, event.description, ...hasKeys.map((key) => key && JSON.stringify(event[key]))],
                    ]);
                    [1].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col));
                    mergeRows(sheet, lastNumbers, rowNumber, 2, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 3, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 4, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value());
                    rowNumber++;
                });
            });
        });
        [1, 2, 3, 4].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 4;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }

    {
        const sheet = workbook.addSheet('组件方法汇总');
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '方法名称', '方法标题', '方法描述'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 24, 30, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.subs.forEach((sub) => {
                sub.methods && sub.methods.forEach((method) => {
                    if (method.advanced)
                        return;
                    const hasKeys = collectOtherKeys(method, otherKeys, ['name', 'title', 'description']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.alias, sub.title, method.name, method.title, method.description, ...hasKeys.map((key) => key && JSON.stringify(method[key]))],
                    ]);
                    [1].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col));
                    mergeRows(sheet, lastNumbers, rowNumber, 2, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 3, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 4, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value());
                    rowNumber++;
                });
            });
        });
        [1, 2, 3, 4].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 4;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }

    {
        const sheet = workbook.addSheet('组件插槽汇总');
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '插槽名称', '插槽标题', '插槽描述'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 18, 18, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.subs.forEach((sub) => {
                sub.slots && sub.slots.forEach((slot) => {
                    if (slot.advanced)
                        return;
                    const hasKeys = collectOtherKeys(slot, otherKeys, ['name', 'title', 'description']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.alias, sub.title, slot.name, slot.title, slot.description, ...hasKeys.map((key) => key && JSON.stringify(slot[key]))],
                    ]);
                    [1].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col));
                    mergeRows(sheet, lastNumbers, rowNumber, 2, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 3, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value());
                    mergeRows(sheet, lastNumbers, rowNumber, 4, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value());
                    rowNumber++;
                });
            });
        });
        [1, 2, 3, 4].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 4;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }
    
    workbook.sheet(0).delete();
    
    return workbook.toFileAsync(path.join(__dirname, './组件总表.xlsx'));
});
