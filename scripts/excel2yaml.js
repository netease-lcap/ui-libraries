const YAML = require('yaml');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs-extra');
const path = require('path');
const { components, components0 } = require('./common/loadComponents');

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
// let components0 = pcComponents.slice();
// h5Components.forEach((item) => {
//     let lastIndex = components0.length - 1;
//     for (let i = components0.length - 1; i >= 0; i--) {
//         const item2 = components0[i];
//         if (item2.group === item.group) {
//             lastIndex = i;
//             break;
//         }
//     }
//     components0.splice(lastIndex + 1, 0, item);
// });
// /**
//  * PC、H5 按名字对齐，方便属性、事件对比
//  */
let components = pcComponents.slice();
// h5Components.forEach((item) => {
//     let lastIndex = components.length - 1;
//     for (let i = components.length - 1; i >= 0; i--) {
//         const item2 = components[i];
//         if (item2.alias === item.alias) {
//             lastIndex = i;
//             break;
//         }
//     }
//     if (lastIndex === components.length - 1) {
//         for (let i = components.length - 1; i >= 0; i--) {
//             const item2 = components[i];
//             if (item2.group === item.group) {
//                 lastIndex = i;
//                 break;
//             }
//         }
//     }
//     components.splice(lastIndex + 1, 0, item);
// });

const filePath = path.join(__dirname, `./组件总表from交互.xlsx`)

// 属性分组
const replaceAtrr = (sheet, oldColName, newColName) => {
    const usedRange = sheet.usedRange();
    const endRowNumber = usedRange.endCell().rowNumber();
    const newAtrr = sheet.range(`${newColName}2:${newColName}${endRowNumber}`).value();
    let oldAttr = sheet.range(`${oldColName}2:${oldColName}${endRowNumber}`).value();
    for (let i = 0; i < oldAttr.length; i++) {
        for (let j = 0; j < oldAttr.length; j++) {
            if (newAtrr[i][j]?.includes('-')) {
                oldAttr[i][j] = ''
            }
            if (newAtrr[i][j]) {
              oldAttr[i][j] = newAtrr[i][j]
            }
        }
    }
    return oldAttr?.flat();
}

const replaceText = (oldText, newText) => {
    let tempText = oldText
    if (newText == '/' || newText == '-') {
        tempText = '';
    } else if (newText) {
        tempText = newText;
    }
    return tempText;
}

XlsxPopulate.fromFileAsync(filePath).then((workbook) => {
    // 分析 excel
    const sheet1 = workbook.sheet('组件属性');
    const sheetData = sheet1.usedRange().value();
    const usedRange = sheet1.usedRange();
    let startColumnNumber = usedRange.startCell().columnNumber();
    let startRowNumber = usedRange.startCell().rowNumber();
    const endColumnNumber = usedRange.endCell().columnNumber();
    let endRowNumber = usedRange.endCell().rowNumber();
    
    // let repalcedAttrGroup = replaceAtrr(sheet1, 'E','H');  // 属性分组
    // let repalcedAttrName = replaceAtrr(sheet1, 'F','I'); // 属性名称
    // let repalcedAttrTitle = replaceAtrr(sheet1, 'G','J'); // 属性标题
    // let repalcedAttrDesc = replaceAtrr(sheet1, 'K','L'); // 属性描述
    // 替换属性
    // sheetData[sheet1.cell('E1').columnNumber()] = repalcedAttrGroup;
    // // sheetData[sheet1.cell('F1').columnNumber()] = repalcedAttrName;
    // sheetData[sheet1.cell('G1').columnNumber()] = repalcedAttrTitle;
    // sheetData[sheet1.cell('K1').columnNumber()] = repalcedAttrDesc;
    
    const tooltipLink = sheet1.range(`N1:N${endRowNumber}`).value().flat(); // 释义文档链接
    const docDescription = sheet1.range(`O1:O${endRowNumber}`).value().flat(); // 文档描述
    // 插入属性
    sheetData.splice(sheet1.cell('L1').columnNumber() + 1, 0, tooltipLink, docDescription)
    
    let formateSheetData = [];
    for (let row = 1; row < sheetData.length; row++) {
        let objMap = {
          "type": sheetData[row][0],
          "frontend": sheetData[row][1],
          "comTitle": sheetData[row][2],
          "childComTitle": sheetData[row][3],
          "attrOldName": sheetData[row][5],
          "attrGroup": sheetData[row][7],
        //   "attrName": sheetData[row][8],
          "attrTitle": sheetData[row][9],
          "attrDescription": sheetData[row][11],
          "tooltipLink": sheetData[row][13],
          "docDescription": sheetData[row][14]
        }
        formateSheetData.push(objMap);
    }
    
    const componentMap = {};
    components.forEach(component => {
        const { alias } = component
        componentMap[alias] = component.subs;
    })

    formateSheetData.forEach(sheet => {
        componentMap[sheet.comTitle]?.forEach(c => {
            c.attrs?.forEach((attr) => {
                const items = formateSheetData.filter(item => item.childComTitle == c.title)
                const sheetItem = items.find(item => item.attrOldName == attr.name)
                if (sheetItem) {
                    attr.group = replaceText(attr.group, sheetItem.attrGroup);
                    attr.title = replaceText(attr.title, sheetItem.attrTitle);
                    attr.description = replaceText(attr.description, sheetItem.attrDescription);
                    attr.tooltipLink = sheetItem.tooltipLink || '';
                    attr.docDescription = sheetItem.docDescription || ''
                }
            })
        }) 
    })
    components.forEach(c => {
        const { alias } = c;
        for (let key in componentMap) {
            if (key === alias) {
                c.subs = componentMap[key]
            }
        }
    })

   let order = ['数据属性', '主要属性', '交互属性', '状态属性', '样式属性', '选择属性'];
    components.forEach(c => {
       c.subs?.forEach(s => {
            s.attrs?.sort((a, b) => {
              return order.indexOf(a.group) - order.indexOf(b.group)
            })
       })
    })

    // 生成 YAML
    components.forEach((component) => {
        component.subs.forEach((sub) => {
            ['next', 'nested', 'accept-parent', 'control', 'is-sub', 'nexted', 'brifeDoc'].forEach((key) => {
                if (sub.hasOwnProperty(key))
                    delete sub[key];
            });
        });
        fs.writeFileSync(component.yamlPath, YAML.stringify(component.subs));
    });
});
