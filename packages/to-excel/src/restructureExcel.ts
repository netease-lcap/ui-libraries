import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs-extra';

async function main() {
  // const inputPath = path.join(__dirname, '../out/组件总表（ElementPlus）.xlsx');
  // const outputPath = path.join(__dirname, '../out1/组件总表（ElementPlus）-重组.xlsx');

   const inputPath = path.join(__dirname, '../out/组件总表（PC+H5）.xlsx');
  const outputPath = path.join(__dirname, '../out1/组件总表（PC+H5）-重组.xlsx');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputPath);

  // 1. 解析第一个sheet，提取所有子组件名称、子组件标题、端
  const baseSheet = workbook.worksheets[0];
  const baseRows = baseSheet.getSheetValues(); // 第一行为表头
  const baseHeader = baseRows[1] as any[];
  const nameIdx = baseHeader.findIndex((h: any) => h && h.toString().includes('子组件名称'));
  const titleIdx = baseHeader.findIndex((h: any) => h && h.toString().includes('子组件标题'));
  const frontendIdx = baseHeader.findIndex((h: any) => h && h.toString().includes('端'));

  // 2. 解析其它sheet，按子组件名称映射
  function collectBySubName(sheet: ExcelJS.Worksheet, keyName: string, extraKeys: string[] = []) {
    const rows = sheet.getSheetValues();
    const header = rows[1] as any[];
    const subNameIdx = header.findIndex((h: any) => h && h.toString().includes('子组件标题'));
    const frontendIdx = header.findIndex((h: any) => h && h.toString().includes('端'));
    const nameIdx = header.findIndex((h: any) => h && h.toString().includes(keyName));
    const extraIdxs = extraKeys.map((k) => header.findIndex((h: any) => h && h.toString().includes(k)));
    const map: Record<string, Record<string, any[]>> = { PC: {}, H5: {} };
    rows.forEach((row, i) => {
      const arr = row as any[];
      if (i < 2 || !arr) return;
      const subName = arr[subNameIdx];
      const frontend = (arr[frontendIdx] || '').toString().toUpperCase();
      if (!subName || !frontend) return;
      let group = 'PC';
      if (frontend === 'H5') {
        group = 'H5';
      } else if (frontend === 'PC') {
        group = 'PC';
      }
      if (!map[group][subName]) map[group][subName] = [];
      const item: any = { name: arr[nameIdx] };
      extraIdxs.forEach((idx, j) => { item[extraKeys[j]] = arr[idx]; });
      map[group][subName].push(item);
    });
    return map;
  }

  // 属性名
  const propsMap = collectBySubName(workbook.getWorksheet('组件属性汇总'), '属性名称', ['双向绑定（model/sync）', '属性类型']);
  // 可访问属性名
  const readablePropsMap = collectBySubName(workbook.getWorksheet('组件可访问属性汇总'), '属性名称');
  // 事件名
  const eventsMap = collectBySubName(workbook.getWorksheet('组件事件汇总'), '事件名称', ['事件类型']);
  // 方法名、参数、返回值
  const methodsMap = collectBySubName(workbook.getWorksheet('组件方法汇总'), '方法名称', ['方法参数', '方法返回值']);
  // 插槽名
  const slotsMap = collectBySubName(workbook.getWorksheet('组件插槽汇总'), '插槽名称', ['插槽类型']);

  // 3. 整合数据，按端生成两个sheet
  const outWorkbook = new ExcelJS.Workbook();
  ['PC', 'H5'].forEach((group) => {
    const outSheet = outWorkbook.addWorksheet(`${group}重组组件表`);
    outSheet.columns = [
      { header: '子组件名称', key: 'subName', width: 30 },
      { header: '子组件标题', key: 'subTitle', width: 20 },
      { header: '属性名称', key: 'prop', width: 30 },
      { header: '属性类型', key: 'propType', width: 30 },
      { header: '属性双向绑定（model/sync）', key: 'propSync', width: 30 },
      { header: '可访问属性名称', key: 'readableProp', width: 30 },
      { header: '事件名称', key: 'event', width: 30 },
      { header: '事件类型', key: 'eventType', width: 30 },
      { header: '方法名称', key: 'method', width: 30 },
      { header: '方法参数', key: 'methodParams', width: 40 },
      { header: '方法返回值', key: 'methodReturns', width: 40 },
      { header: '插槽名称', key: 'slot', width: 30 },
      { header: '插槽类型', key: 'slotType', width: 30 },
    ];
    baseRows.forEach((row, i) => {
      const arr = row as any[];
      if (i < 2 || !arr) return;
      const subName = arr[nameIdx];
      const subNameKey = arr[titleIdx];
      const subTitle = arr[titleIdx];
      const frontend = (arr[frontendIdx] || '').toString().toUpperCase();
      if (!subName || !frontend) return;
      if ((group === 'PC' && frontend !== 'PC') || (group === 'H5' && frontend !== 'H5')) return;
      // 属性
      if (propsMap[group][subNameKey]) {
        propsMap[group][subNameKey].forEach((p) => {
          outSheet.addRow({ subName, subTitle, prop: p.name, propType: p['属性类型'], propSync: p['双向绑定（model/sync）'] });
        });
      }
      // 可访问属性
      if (readablePropsMap[group][subNameKey]) {
        readablePropsMap[group][subNameKey].forEach((p) => {
          outSheet.addRow({ subName, subTitle, readableProp: p.name });
        });
      }
      // 事件
      if (eventsMap[group][subNameKey]) {
        eventsMap[group][subNameKey].forEach((e) => {
          outSheet.addRow({ subName, subTitle, event: e.name, eventType: e['事件类型'] });
        });
      }
      // 方法
      if (methodsMap[group][subNameKey]) {
        methodsMap[group][subNameKey].forEach((m) => {
          outSheet.addRow({ subName, subTitle, method: m.name, methodParams: m['方法参数'], methodReturns: m['方法返回值'] });
        });
      }
      // 插槽
      if (slotsMap[group][subNameKey]) {
        slotsMap[group][subNameKey].forEach((s) => {
          outSheet.addRow({ subName, subTitle, slot: s.name, slotType: s['插槽类型'] });
        });
      }
    });
  });

  await fs.ensureDir(path.dirname(outputPath));
  await outWorkbook.xlsx.writeFile(outputPath);
  console.log('重组完成，输出文件：', outputPath);
}

main().catch(console.error);
