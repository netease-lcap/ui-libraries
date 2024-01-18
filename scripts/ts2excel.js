const XlsxPopulate = require('xlsx-populate');
const path = require('path');
const { components, components0 } = require('./common/loadViewComponents');

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

const setterMap = {
    InputSetter: '输入框',
    NumberInputSetter: '数字输入框',
    EnumSelectSetter: '枚举选择器',
    CapsulesSetter: '胶囊选择器',
    SwitchSetter: '开关',
    IconSetter: '图标选择器',
    ImageSetter: '图片选择器',
    PropertySelectSetter: '属性选择器',
}

function excludeKeys(obj, keys) {
    if (!obj)
        return undefined;
    const newObj = {};
    Object.keys(obj).forEach((key) => {
        if (!keys.includes(key))
            newObj[key] = obj[key];
    });
    return newObj;
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

XlsxPopulate.fromBlankAsync().then((workbook) => {
    {
        const sheet = workbook.addSheet('组件基本信息');
        const firstRowData = ['分类', '端', '组件名称', '组件标题', '子组件名称', '子组件标题', '图标', '描述', '泛型参数']; // '属性类型依赖', '属性显隐依赖'
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 22, 18, 30, 14, 18, 80, 62, 14, 14].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components0.forEach((component) => {
            component.children.forEach((sub) => {
                const hasKeys = collectOtherKeys(sub, otherKeys, ['concept', 'kebabName', 'blocks', 'themeVariables', 'frontend', 'vusion', 'group', 'name', 'title', 'alias', 'show', 'icon', 'description', 'tsTypeParams', 'props', 'readableProps', 'events', 'slots', 'methods', 'children']);
                sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                    [groupMap[component.group], component.frontend.toUpperCase(), component.name, component.title, sub.name, sub.title, sub.icon, sub.description, sub.tsTypeParams, '', '', ...hasKeys.map((key) => key && JSON.stringify(sub[key]))],
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
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '泛型参数', '属性分组', '属性名称', '属性标题', '属性描述', '所在面板', '双向绑定（model/sync）', '属性类型', '默认值', '设计器的展示值', '设置器类型', '设置器参数', '工具提示链接', '文档描述', '隐藏绑定弹窗', '打开绑定弹窗', '显隐联动条件', '禁用联动条件', '当切换时'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 30, 10, 24, 28, 80, 10, 20, 20, 30, 30, 10, 80, 12, 12, 12, 12, 40, 40, 40].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.children.forEach((sub) => {
                sub.props && sub.props.forEach((prop) => {
                    const hasKeys = collectOtherKeys(prop, otherKeys, ['concept', 'group', 'name', 'title', 'description', 'tabKind', 'sync', 'tsType', 'defaultValue', 'designerValue', 'setter', 'tooltipLink', 'docDescription', 'bindHide', 'bindOpen', 'if', 'disabledIf', 'onChange']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.title, sub.title, sub.tsTypeParams, prop.group || '主要属性', prop.name, prop.title, prop.description, prop.tabKind, prop.sync, prop.tsType, prop.defaultValue?.expression?.concept.endsWith('Literal') ? prop.defaultValue?.expression?.value : JSON.stringify(prop.defaultValue?.expression), JSON.stringify(prop.designerValue), setterMap[prop.setter?.concept] || prop.setter?.concept, JSON.stringify(excludeKeys(prop.setter, 'concept')),
                            prop.tooltipLink, prop.docDescription, prop.bindHide, prop.bindOpen, prop.if, prop.disabledIf, JSON.stringify(prop.onChange), ...hasKeys.map((key) => key && JSON.stringify(prop[key]))],
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
                    mergeRows(sheet, lastNumbers, rowNumber, 6, sheet.cell(rowNumber, 2).value() !== sheet.cell(rowNumber - 1, 2).value()
                                                            || sheet.cell(rowNumber, 3).value() !== sheet.cell(rowNumber - 1, 3).value()
                                                            || sheet.cell(rowNumber, 4).value() !== sheet.cell(rowNumber - 1, 4).value()
                                                            || sheet.cell(rowNumber, 6).value() !== sheet.cell(rowNumber - 1, 6).value());
                    rowNumber++;
                });
            });
        });
        [1, 2, 3, 4, 5, 6].forEach((col) => mergeRows(sheet, lastNumbers, rowNumber, col, true));
        sheet.range(1, firstRowData.length + 1, 1, firstRowData.length + 1 + otherKeys.length).value([otherKeys]);

        const MERGE_COUNT = 5;
        sheet.freezePanes(MERGE_COUNT, 1);
        sheet.usedRange().style({
            verticalAlignment: 'center',
        });
    }

    {
        const sheet = workbook.addSheet('组件可访问属性汇总');
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '泛型参数', '属性分组', '属性名称', '属性标题', '属性描述', '所在面板', '属性类型'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 30, 24, 28, 20, 10, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.children.forEach((sub) => {
                sub.readableProps && sub.readableProps.forEach((prop) => {
                    const hasKeys = collectOtherKeys(prop, otherKeys, ['concept', 'group', 'name', 'title', 'description', 'tsType', 'tabKind']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.title, sub.title, sub.tsTypeParams, prop.group || '主要属性', prop.name, prop.title, prop.description, prop.tabKind, prop.tsType, ...hasKeys.map((key) => key && JSON.stringify(prop[key]))],
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
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '泛型参数', '事件名称', '事件标题', '事件描述', '事件类型'];
        sheet.range(1, 1, 1, firstRowData.length).value([firstRowData]);
        sheet.row(1).style({
            bold: true,
            fill: 'E1EAFF',
        }).height(22);
        [6, 4, 18, 14, 30, 24, 30, 80].forEach((width, index) => sheet.column(index + 1).width(width));

        let rowNumber = 2;
        let lastNumbers = [null];
        const otherKeys = [];
        components.forEach((component) => {
            component.children.forEach((sub) => {
                sub.events && sub.events.forEach((event) => {
                    const hasKeys = collectOtherKeys(event, otherKeys, ['concept', 'name', 'title', 'description', 'tsType']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.title, sub.title, sub.tsTypeParams, event.name, event.title, event.description, event.tsType, ...hasKeys.map((key) => key && JSON.stringify(event[key]))],
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
            component.children.forEach((sub) => {
                sub.methods && sub.methods.forEach((method) => {
                    const hasKeys = collectOtherKeys(method, otherKeys, ['concept', 'name', 'title', 'description']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.title, sub.title, method.name, method.title, method.description, ...hasKeys.map((key) => key && JSON.stringify(method[key]))],
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
        const firstRowData = ['分类', '端', '组件标题', '子组件标题', '插槽名称', '插槽标题', '插槽描述', '插槽类型'];
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
            component.children.forEach((sub) => {
                sub.slots && sub.slots.forEach((slot) => {
                    const hasKeys = collectOtherKeys(slot, otherKeys, ['concept', 'name', 'title', 'description', 'tsType']);
                    sheet.range(rowNumber, 1, rowNumber, firstRowData.length + hasKeys.length).value([
                        [groupMap[component.group], component.frontend.toUpperCase(), component.title, sub.title, slot.name, slot.title, slot.description, slot.tsType, ...hasKeys.map((key) => key && JSON.stringify(slot[key]))],
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
    
    return workbook.toFileAsync(path.join(__dirname, './组件总表（TS版）.xlsx'));
});
