import {
  randomString,
  ComponentCode,
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'Table';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    if (!slotNodes.length) {
      return null;
    }
    const colsCode: string[] = [];
    const slots: ComponentCode['slots'] = [];
    slotNodes.forEach((col, i) => {
      const textNode = col[0];
      // 表头文本
      const text = textNode.attrs.text?.trim();
      const templateName = `template_${randomString(componentNode.id)}${i}`;
      // 列代码
      const colCode = `
            <el-table-column-pro>
                <template #title><el-text text="${text}" /></template>
                <template #cell="current" ref="${templateName}"></template>
            </el-table-column-pro>`;
      colsCode.push(colCode);

      // 第一行的 nodes
      const firstRowNodes = col.slice(1);
      const slot = {
        templateName,
        childrenIds: firstRowNodes.map((node) => node.id),
      };
      slots.push(slot);
    });

    // 表格宽高
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });

    return {
      id: componentNode.id,
      code: `
<el-table-pro 
    style="${styleStr}"
    :dataSource="[]"
    :pagination="false"
>
\t${colsCode.join('\n\t')}
</el-table-pro>
            `,
      slots,
    };
  },
  name: '数据表格',
  reason: '展示数据表格',
  tag: 'el-table-pro',
};
