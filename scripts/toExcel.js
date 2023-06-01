const YAML = require('yaml');
const xlsx = require('node-xlsx');
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
function mergeRows(data, startRow, col) {
    let lastValue;
    let lastIndex = startRow;

    const merges = [];
    data.forEach((item, index) => {
        if (index < startRow)
            return;
        const value = item[col].v || item[col];
        if (lastValue && lastValue !== value) {
            merges.push({ s: { c: col, r: lastIndex }, e: { c: col, r: index - 1 } });
            lastIndex = index;
        }
        lastValue = value;
    });
    data.length - 1 - lastIndex > 1 && merges.push({ s: { c: col, r: lastIndex }, e: { c: col, r: data.length - 1 } });

    return merges;
}

const sheets = [];
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
        const data = [];
        let firstRow = ['分类', '组件名称', '组件标题', '子组件名称', '子组件标题', '图标', '描述'];
        const firstRowStyle = {
            fill: { patternType: 'solid', fgColor: { rgb: 'E1EAFF' } },
            font: { bold: true },
            alignment: { vertical: 'center' },
        };
        firstRow = firstRow.map((value) => ({ v: value, s: firstRowStyle }));
        data.push(firstRow);
        
        const options = {
            '!cols': [{ wch: 6 }, { wch: 30 }, { wch: 14 }, { wch: 30 }, { wch: 14 }, { wch: 30 }, { wch: 80 }],
            '!rows': [{ hpt: 22 }]
        };

        const mergeStyle = {
            fill: { patternType: 'solid', fgColor: { rgb: 'EEEEEE' } },
            alignment: { vertical: 'center' }
        };
        components.forEach((component) => {
            component.components.forEach((subComponent) => {
                data.push([{
                    v: groupMap[component.group],
                    s: mergeStyle,
                }, {
                    v: component.name,
                    s: mergeStyle,
                }, {
                    v: component.alias,
                    s: mergeStyle,
                }, subComponent.name, subComponent.title, subComponent.icon, subComponent.description]);
            });
        });

        options['!merges'] = [
            ...mergeRows(data, 1, 0),
            ...mergeRows(data, 1, 1),
            ...mergeRows(data, 1, 2),
        ];

        sheets.push({ name: frontend.toUpperCase() + '组件基本信息', data, options });
    }

    // sheets.push({ name: frontend.toUpperCase() + '组件属性汇总', data });
}

addSheet('pc');
addSheet('h5');

const buffer = xlsx.build(sheets, {
    parseOptions: { cellStyles: true },
});
fs.writeFileSync(path.join(__dirname, './组件总表.xlsx'), buffer, { flag: 'w' });