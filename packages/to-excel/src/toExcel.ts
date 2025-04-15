/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as ExcelJS from 'exceljs';
import { loadComponents } from './loadComponents';

export const groupMap: Record<string, string> = {
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
};

export const setterMap: Record<string, string> = {
  InputSetter: '输入框',
  NumberInputSetter: '数字输入框',
  EnumSelectSetter: '枚举选择器',
  CapsulesSetter: '胶囊选择器',
  SwitchSetter: '开关',
  IconSetter: '图标选择器',
  ImageSetter: '图片选择器',
  PropertySelectSetter: '属性选择器',
};

function mergeRows(sheet: ExcelJS.Worksheet, lastNumbers: number[], rowNumber: number, col: number, condition?: boolean) {
  const lastNumber = lastNumbers[col];
  condition = condition || sheet.getCell(rowNumber, col).value !== sheet.getCell(rowNumber - 1, col).value;
  if (condition) {
    rowNumber - 1 - lastNumber >= 1 && sheet.mergeCells(lastNumber, col, rowNumber - 1, col);
    lastNumbers[col] = rowNumber;
  }
}

export function mergeColumnRows(sheet: ExcelJS.Worksheet, lastNumbers: number[], rowNumber: number, config: Record<number, number | number[]>) {
  Object.keys(config).forEach((col) => {
    const refCols = config[+col];
    mergeRows(sheet, lastNumbers, rowNumber, +col, !Array.isArray(refCols) ? undefined : refCols.some((refCol) => sheet.getCell(rowNumber, +refCol).value !== sheet.getCell(rowNumber - 1, +refCol).value));
  });
}

export function excludeKeys(obj: Record<string, string>, keys: string[]) {
  if (!obj) return undefined;
  const newObj: Record<string, string> = {};
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
}

function collectOtherKeys(obj: Record<string, string>, otherKeys: string[], excludedKeys: string[]) {
  const hasKeys: string[] = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (excludedKeys.includes(key)) return;
    if (!otherKeys.includes(key)) otherKeys.push(key);
  });
  otherKeys.forEach((key) => {
    hasKeys.push(keys.includes(key) ? key : '');
  });
  return hasKeys;
}

function addColumnStyle(columns: Partial<ExcelJS.Column>[], mergeCount: number) {
  columns.forEach((column, index) => {
    column.style = { ...column.style, alignment: { ...column.style?.alignment, vertical: index < mergeCount ? 'middle' : 'top', wrapText: true } };
  });
  return columns;
}

export async function toExcel(fileName: string, libNames?: { pc: string, h5?: string }, hideRestKeys?: boolean, cb?: (
  addSheet: (
    title: string,
    mergeCount: number,
    columns: Partial<ExcelJS.Column>[],
    featureType: string | undefined,
    excludedKeys: string[] | undefined,
    cb1: (component: any, sub: any, feature: any) => string[],
    mergeColumnRowsConfig: Record<number, number | number[]>
  ) => void,
) => void) {
  const { components0 } = loadComponents(libNames);

  const workbook = new ExcelJS.Workbook();

  function addSheet(
    title: string,
    mergeCount: number,
    columns: Partial<ExcelJS.Column>[],
    featureType: string | undefined,
    excludedKeys: string[] | undefined,
    cb1: (component: any, sub: any, feature: any) => string[],
    mergeColumnRowsConfig: Record<number, number | number[]>,
    cb2?: (component: any, sub: any, func2: (extraRow: string[]) => void) => void,
  ) {
    const sheet = workbook.addWorksheet(title, {
      views: [{ state: 'frozen', xSplit: mergeCount, ySplit: 1 }],
      properties: { defaultRowHeight: 22 },
    });

    sheet.columns = addColumnStyle(columns, mergeCount);
    const eKeys = excludedKeys || [];
    eKeys.push('concept', ...columns.map((column) => column.key || '').filter((key) => key));

    const fixedLength = sheet.columns.length;

    const firstRow = sheet.getRow(1);
    firstRow.height = 18;

    let rowNumber = 2;
    const lastNumbers = [0];
    const otherKeys: string[] = [];
    components0.forEach((component) => {
      (component.children as any[]).forEach((sub) => {
        function func(feature: any) {
          const featureOrSub = feature || sub;
          const hasKeys = hideRestKeys ? [] : collectOtherKeys(featureOrSub, otherKeys, eKeys);
          sheet.addRow([...cb1(component, sub, feature), ...hasKeys.map((key) => key && JSON.stringify(featureOrSub[key]))], 'i');
          mergeColumnRows(sheet, lastNumbers, rowNumber, mergeColumnRowsConfig);
          rowNumber++;
        }
        function func2(extraRow: string[]) {
          sheet.addRow(extraRow, 'i');
          mergeColumnRows(sheet, lastNumbers, rowNumber, mergeColumnRowsConfig);
          rowNumber++;
        }
        if (featureType) (sub[featureType] as any[]).forEach(func);
        else func(undefined);
        cb2 && cb2(component, sub, func2);
      });
    });
    mergeColumnRows(sheet, lastNumbers, rowNumber, mergeColumnRowsConfig);

    firstRow.height = 22;
    firstRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E1EAFF' },
    };
    firstRow.font = {
      bold: true,
    };
    firstRow.alignment = { vertical: 'middle' };
    !hideRestKeys && otherKeys.forEach((key, index) => {
      sheet.getCell(1, fixedLength + 1 + index).value = key;
    });
  }

  if (cb) {
    cb(addSheet);
  } else {
    addSheet(
      '组件基本信息',
      4,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件名称', key: 'name', width: 22 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件名称', key: 'name', width: 30 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '图标', key: 'icon', width: 18 },
        { header: '描述', key: 'description', width: 80 },
        { header: '泛型参数', key: 'tsTypeParams', width: 62 },
      ],
      undefined,
      ['kebabName', 'blocks', 'themeVariables', 'vusion', 'componentPath', 'alias', 'show', 'props', 'readableProps', 'events', 'slots', 'methods', 'children'],
      (component, sub) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.name,
        component.title,
        sub.name,
        sub.title,
        sub.icon,
        sub.description,
        sub.tsTypeParams,
      ],
      {
        1: 1,
        2: [2, 3],
        3: 3,
        4: 4,
      },
    );

    addSheet(
      '组件属性汇总',
      5,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '泛型参数', key: 'tsTypeParams', width: 30 },
        { header: '属性分组', key: 'group', width: 10 },
        { header: '属性名称', key: 'name', width: 24 },
        { header: '属性标题', key: 'title', width: 28 },
        { header: '属性描述', key: 'description', width: 80 },
        { header: '所在面板', key: 'tabKind', width: 10 },
        { header: '双向绑定（model/sync）', key: 'sync', width: 20 },
        { header: '属性类型', key: 'tsType', width: 20 },
        { header: '隐式转换为字符串', key: 'implicitToString', width: 20 },
        { header: '是否为数据源', key: 'isDataSource', width: 20 },
        { header: '默认值', key: 'defaultValue', width: 30 },
        { header: '设计器的展示值', key: 'designerValue', width: 30 },
        { header: '可设置', key: 'settable', width: 10 },
        { header: '设置器类型', key: 'setter', width: 10 },
        { header: '设置器参数', key: 'setter_options', width: 80 },
        { header: '工具提示链接', key: 'tooltipLink', width: 12 },
        { header: '文档描述', key: 'docDescription', width: 12 },
        { header: '隐藏绑定弹窗', key: 'bindHide', width: 12 },
        { header: '打开绑定弹窗', key: 'bindOpen', width: 12 },
        { header: '显隐联动条件', key: 'if', width: 40 },
        { header: '禁用联动条件', key: 'disabledIf', width: 40 },
        { header: '当切换时', key: 'onChange', width: 40 },
      ],
      'props',
      ['tsOnChange', 'tsIf', 'tsDesignerValue'],
      (component, sub, feature) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.title,
        sub.title,
        sub.tsTypeParams,
        feature.group || '主要属性',
        feature.name,
        feature.title,
        feature.description,
        feature.tabKind,
        feature.sync,
        feature.tsType,
        feature.implicitToString,
        feature.isDataSource,
        feature.defaultValue?.expression?.concept.endsWith('Literal') ? feature.defaultValue?.expression?.value : JSON.stringify(feature.defaultValue?.expression),
        JSON.stringify(feature.designerValue),
        feature.settable,
        setterMap[feature.setter?.concept] || feature.setter?.concept,
        JSON.stringify(excludeKeys(feature.setter, ['concept'])),
        feature.tooltipLink,
        feature.docDescription,
        feature.bindHide,
        feature.bindOpen,
        feature.if,
        feature.disabledIf,
        JSON.stringify(feature.onChange),
      ],
      {
        1: 1,
        2: [2, 3],
        3: [2, 3],
        4: [2, 3, 4],
        5: [2, 3, 4, 5],
        6: [2, 3, 4, 6],
      },
    );

    addSheet(
      '组件可访问属性汇总',
      5,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '泛型参数', key: 'tsTypeParams', width: 30 },
        { header: '属性分组', key: 'group', width: 10 },
        { header: '属性名称', key: 'name', width: 24 },
        { header: '属性标题', key: 'title', width: 28 },
        { header: '属性描述', key: 'description', width: 20 },
        { header: '所在面板', key: 'tabKind', width: 10 },
        { header: '属性类型', key: 'tsType', width: 40 },
      ],
      'readableProps',
      undefined,
      (component, sub, feature) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.title,
        sub.title,
        sub.tsTypeParams,
        feature.group || '主要属性',
        feature.name,
        feature.title,
        feature.description,
        feature.tabKind,
        feature.tsType,
      ],
      {
        1: 1,
        2: [2, 3],
        3: [2, 3],
        4: [2, 3, 4],
        5: [2, 3, 4, 5],
      },
    );

    addSheet(
      '组件事件汇总',
      5,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '泛型参数', key: 'tsTypeParams', width: 30 },
        { header: '事件名称', key: 'name', width: 24 },
        { header: '事件标题', key: 'title', width: 28 },
        { header: '事件描述', key: 'description', width: 80 },
        { header: '事件类型', key: 'tsType', width: 20 },
      ],
      'events',
      undefined,
      (component, sub, feature) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.title,
        sub.title,
        sub.tsTypeParams,
        feature.name,
        feature.title,
        feature.description,
        feature.tsType,
      ],
      {
        1: 1,
        2: [2, 3],
        3: [2, 3],
        4: [2, 3, 4],
        5: [2, 3, 4, 5],
      },
    );

    addSheet(
      '组件方法汇总',
      5,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '泛型参数', key: 'tsTypeParams', width: 30 },
        { header: '方法名称', key: 'name', width: 24 },
        { header: '方法标题', key: 'title', width: 28 },
        { header: '方法描述', key: 'description', width: 60 },
        { header: '方法参数', key: 'params', width: 80 },
        { header: '方法返回值', key: 'returns', width: 80 },
      ],
      'methods',
      undefined,
      (component, sub, feature) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.title,
        sub.title,
        sub.tsTypeParams,
        feature.name,
        feature.title,
        feature.description,
        JSON.stringify(feature.params),
        JSON.stringify(feature.returns),
      ],
      {
        1: 1,
        2: [2, 3],
        3: [2, 3],
        4: [2, 3, 4],
      },
    );

    addSheet(
      '组件插槽汇总',
      5,
      [
        { header: '分类', key: 'group', width: 6 },
        { header: '端', key: 'frontend', width: 5 },
        { header: '组件标题', key: 'title', width: 18 },
        { header: '子组件标题', key: 'title', width: 14 },
        { header: '泛型参数', key: 'tsTypeParams', width: 30 },
        { header: '插槽名称', key: 'name', width: 24 },
        { header: '插槽标题', key: 'title', width: 30 },
        { header: '插槽描述', key: 'description', width: 40 },
        { header: '插槽类型', key: 'tsType', width: 40 },
        { header: '插槽参数', key: 'params', width: 80 },
        { header: '代码片段', key: 'snippets', width: 80 },
        { header: '空态背景', key: 'emptyBackground', width: 80 },
      ],
      'slots',
      undefined,
      (component, sub, feature) => [
        groupMap[component.group],
        component.frontend.toUpperCase(),
        component.title,
        sub.title,
        sub.tsTypeParams,
        feature.name,
        feature.title,
        feature.description,
        feature.tsType,
        JSON.stringify(feature.params),
        JSON.stringify(feature.snippets),
        feature.emptyBackground,
      ],
      {
        1: 1,
        2: [2, 3],
        3: [2, 3],
        4: [2, 3, 4],
      },
    );
  }

  await fs.ensureDir(path.join(__dirname, '../out'));
  await workbook.xlsx.writeFile(path.join(__dirname, `../out/${fileName}.xlsx`));
}
