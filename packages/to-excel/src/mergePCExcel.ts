import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs-extra';

async function main() {
  // 文件路径
  const basePath = path.join(__dirname, '../out1/组件总表（PC+H5）-重组.xlsx');
  const elPlusPath = path.join(__dirname, '../out1/组件总表（ElementPlus）-重组.xlsx');
  const outputPath = path.join(__dirname, '../out1/组件总表（PC+ElementPlus）-合并.xlsx');

  // 读取两个工作簿
  const baseWb = new ExcelJS.Workbook();
  await baseWb.xlsx.readFile(basePath);
  const elPlusWb = new ExcelJS.Workbook();
  await elPlusWb.xlsx.readFile(elPlusPath);

  // 只处理PC重组组件表
  const baseSheet = baseWb.getWorksheet('PC重组组件表');
  const elPlusSheet = elPlusWb.getWorksheet('PC重组组件表');
  if (!baseSheet || !elPlusSheet) {
    throw new Error('找不到PC重组组件表sheet');
  }

  // 获取表头
  const baseHeaderRow = baseSheet.getRow(1);
  const elPlusHeaderRow = elPlusSheet.getRow(1);
  const baseHeaders = baseHeaderRow.values as string[];
  const elPlusHeaders = elPlusHeaderRow.values as string[];

  // 需要拼接的列名
  const mergeKeys = ['子组件名称', '子组件标题', '属性名称', '可访问属性名称', '事件名称', '方法名称', '方法参数', '方法返回值', '插槽名称'];

  // 构建ElementPlus数据Map，key为ElButton等
  const elPlusDataMap: Record<string, any[]> = {};
  elPlusSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowObj: Record<string, any> = {};
    elPlusHeaders.forEach((h, idx) => {
      rowObj[h] = row.getCell(idx).value;
    });
    // 组件名如ElButton
    const elName = rowObj['子组件名称'];
    if (elName) {
      if (!elPlusDataMap[elName]) elPlusDataMap[elName] = [];
      elPlusDataMap[elName].push(rowObj);
    }
  });

  // 新建输出工作簿和sheet
  const outWb = new ExcelJS.Workbook();
  const outSheet = outWb.addWorksheet('PC重组组件表');

  // 合并后的表头
  const outHeaders: string[] = [];
  mergeKeys.forEach((key) => {
    outHeaders.push(key, `ElementPlus_${key}`);
  });
  outSheet.addRow(outHeaders);

  // 遍历主表每一行，合并ElementPlus信息
  baseSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowObj: Record<string, any> = {};
    baseHeaders.forEach((h, idx) => {
      rowObj[h] = row.getCell(idx).value;
    });
    // UButton -> ElButton
    let elName = rowObj['子组件名称'];
    if (typeof elName === 'string' && elName.startsWith('U')) {
      elName = `El${elName.slice(1)}`;
    }
    // 找到ElementPlus对应行
    const elRows = elPlusDataMap[elName] || [{}];
    // 只取第一个匹配（如有多行可扩展）
    const elRow = elRows[0] || {};
    // 拼接每一列
    const outRow: any[] = [];
    mergeKeys.forEach((key) => {
      outRow.push(rowObj[key] || '', elRow[key] || '');
    });
    outSheet.addRow(outRow);
  });

  await fs.ensureDir(path.dirname(outputPath));
  await outWb.xlsx.writeFile(outputPath);
  console.log('合并完成，输出文件：', outputPath);
}

main().catch(console.error);
