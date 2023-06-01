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
     * @param {*} frontend 
     */
    function addSheet(frontend) {
        const components = require(`../${frontend}-ui/scripts/lcap/config`);
        components.forEach((component) => {
            let componentPath = path.join(__dirname, `../${frontend}-ui/src/components/${component.name}.vue/api.yaml`);
            if (frontend === 'h5') {
                componentPath = path.join(__dirname, `../${frontend}-ui/src/${component.name}/api.yaml`);
                if (!fs.existsSync(componentPath))
                    componentPath = path.join(__dirname, `../${frontend}-ui/src-vusion/components/${component.name}${frontend === 'h5' ? '' : '.vue'}/api.yaml`);
            }
    
            component.components = YAML.parse(fs.readFileSync(componentPath, 'utf8'));
        });
        
        {
            const sheet = workbook.addSheet(frontend.toUpperCase() + '组件基本信息');
            const firstRowData = ['分类', '组件名称', '组件标题', '子组件名称', '子组件标题', '图标', '描述'];
            sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
            sheet.row(1).style({
                bold: true,
                fill: 'E1EAFF',
            }).height(22);
            sheet.column(1).width(6);
            sheet.column(2).width(30);
            sheet.column(3).width(14);
            sheet.column(4).width(30);
            sheet.column(5).width(14);
            sheet.column(6).width(30);
            sheet.column(7).width(80);

            let rowNumber = 2;
            const otherKeys = [];
            components.forEach((component) => {
                component.components.forEach((subComponent) => {
                    const hasKeys = collectOtherKeys(subComponent, otherKeys, ['name', 'title', 'icon', 'description', 'labels', 'attrs', 'slots', 'events', 'methods', 'computed', 'aria']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.name, component.alias, subComponent.name, subComponent.title, subComponent.icon, subComponent.description, ...hasKeys.map((key) => key && JSON.stringify(subComponent[key]))],
                    ]);
                    rowNumber++;
                });
            });
            sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

            const MERGE_COUNT = 3;
            sheet.freezePanes(MERGE_COUNT, 1);
            const usedRange = mergeSameRows(sheet, MERGE_COUNT);
            usedRange.style({
                verticalAlignment: 'center',
            });
        }
    
        {
            const sheet = workbook.addSheet(frontend.toUpperCase() + '组件属性汇总');
            const firstRowData = ['分类', '组件标题', '子组件标题', '属性分组', '属性名称', '属性标题', '属性描述', '属性类型', 'options', 'default', 'display', 'bindHide', 'tooltipLink'];
            sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
            sheet.row(1).style({
                bold: true,
                fill: 'E1EAFF',
            }).height(22);
            sheet.column(1).width(6);
            sheet.column(2).width(14);
            sheet.column(3).width(14);
            sheet.column(7).width(80);

            let rowNumber = 2;
            const otherKeys = [];
            components.forEach((component) => {
                component.components.forEach((subComponent) => {
                    subComponent.attrs && subComponent.attrs.forEach((attr) => {
                        if (attr.advanced)
                            return;
                        const hasKeys = collectOtherKeys(attr, otherKeys, ['group', 'name', 'title', 'description', 'type', 'options', 'default', 'display', 'bindHide', 'tooltipLink']);
                        if (/[\u0008]/g.test(attr.description))
                            console.log(subComponent.title, attr.name);
                        sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                            [groupMap[component.group], component.alias, subComponent.title, attr.group, attr.name, attr.title, attr.description, attr.type, JSON.stringify(attr.options), JSON.stringify(attr.default), attr.display, attr.bindHide, attr.tooltipLink, ...hasKeys.map((key) => key && JSON.stringify(attr[key]))],
                        ]);
                        rowNumber++;
                    });
                });
            });
            sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

            const MERGE_COUNT = 4;
            sheet.freezePanes(MERGE_COUNT, 1);
            const usedRange = mergeSameRows(sheet, MERGE_COUNT);
            usedRange.style({
                verticalAlignment: 'center',
            });
        }

        {
            const sheet = workbook.addSheet(frontend.toUpperCase() + '组件事件汇总');
            const firstRowData = ['分类', '组件标题', '子组件标题', '事件名称', '事件标题', '事件描述'];
            sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
            sheet.row(1).style({
                bold: true,
                fill: 'E1EAFF',
            }).height(22);
            sheet.column(1).width(6);
            sheet.column(2).width(14);
            sheet.column(3).width(14);
            sheet.column(6).width(80);

            let rowNumber = 2;
            const otherKeys = [];
            components.forEach((component) => {
                component.components.forEach((subComponent) => {
                    subComponent.events && subComponent.events.forEach((event) => {
                        if (event.advanced)
                            return;
                        const hasKeys = collectOtherKeys(event, otherKeys, ['name', 'title', 'description']);
                        sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                            [groupMap[component.group], component.alias, subComponent.title, event.name, event.title, event.description, ...hasKeys.map((key) => key && JSON.stringify(event[key]))],
                        ]);
                        rowNumber++;
                    });
                });
            });
            sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

            const MERGE_COUNT = 3;
            sheet.freezePanes(MERGE_COUNT, 1);
            const usedRange = mergeSameRows(sheet, MERGE_COUNT);
            usedRange.style({
                verticalAlignment: 'center',
            });
        }

        {
            const sheet = workbook.addSheet(frontend.toUpperCase() + '组件方法汇总');
            const firstRowData = ['分类', '组件标题', '子组件标题', '方法名称', '方法标题', '方法描述'];
            sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
            sheet.row(1).style({
                bold: true,
                fill: 'E1EAFF',
            }).height(22);
            sheet.column(1).width(6);
            sheet.column(2).width(14);
            sheet.column(3).width(14);
            sheet.column(6).width(80);

            let rowNumber = 2;
            const otherKeys = [];
            components.forEach((component) => {
                component.components.forEach((subComponent) => {
                    subComponent.methods && subComponent.methods.forEach((method) => {
                        if (method.advanced)
                            return;
                        const hasKeys = collectOtherKeys(method, otherKeys, ['name', 'title', 'description']);
                        sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                            [groupMap[component.group], component.alias, subComponent.title, method.name, method.title, method.description, ...hasKeys.map((key) => key && JSON.stringify(method[key]))],
                        ]);
                        rowNumber++;
                    });
                });
            });
            sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

            const MERGE_COUNT = 3;
            sheet.freezePanes(MERGE_COUNT, 1);
            const usedRange = mergeSameRows(sheet, MERGE_COUNT);
            usedRange.style({
                verticalAlignment: 'center',
            });
        }

        {
            const sheet = workbook.addSheet(frontend.toUpperCase() + '组件插槽汇总');
            const firstRowData = ['分类', '组件标题', '子组件标题', '插槽名称', '插槽标题', '插槽描述'];
            sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
            sheet.row(1).style({
                bold: true,
                fill: 'E1EAFF',
            }).height(22);
            sheet.column(1).width(6);
            sheet.column(2).width(14);
            sheet.column(3).width(14);
            sheet.column(6).width(80);

            let rowNumber = 2;
            const otherKeys = [];
            components.forEach((component) => {
                component.components.forEach((subComponent) => {
                    subComponent.slots && subComponent.slots.forEach((slot) => {
                        if (slot.advanced)
                            return;
                        const hasKeys = collectOtherKeys(slot, otherKeys, ['name', 'title', 'description']);
                        sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                            [groupMap[component.group], component.alias, subComponent.title, slot.name, slot.title, slot.description, ...hasKeys.map((key) => key && JSON.stringify(slot[key]))],
                        ]);
                        rowNumber++;
                    });
                });
            });
            sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

            const MERGE_COUNT = 3;
            sheet.freezePanes(MERGE_COUNT, 1);
            const usedRange = mergeSameRows(sheet, MERGE_COUNT);
            usedRange.style({
                verticalAlignment: 'center',
            });
        }
    }
    
    addSheet('pc');
    addSheet('h5');
    workbook.sheet(0).delete();
    
    return workbook.toFileAsync(path.join(__dirname, './组件总表.xlsx'));
});
