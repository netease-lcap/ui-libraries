import { ComponentCode, ComponentConfig } from '../types';
import { randomString } from '../utils';

const table: ComponentConfig = {
  type: 'Table',
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const colsCode: string[] = [];
    const slots: ComponentCode['slots'] = [];
    slotNodes.forEach((col, i) => {
      const textNode = col[0];
      // 表头文本
      const text = textNode.attrs.text?.trim();
      const templateName = `template_${randomString(componentNode.id)}${i}`;
      // 列代码
      const colCode = `
            <u-table-view-column>
                <template #title><u-text text="${text}" /></template>
                <template #cell="current" ref="${templateName}"></template>
            </u-table-view-column>`;
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
    const { width } = componentNode.bound;
    const { height } = componentNode.bound;

    return {
      id: componentNode.id,
      tag: 'u-table-view',
      code: `
<u-table-view 
    style="width:${width}px;height:${height}px;"
    :dataSource="[]"
>
\t${colsCode.join('\n\t')}
</u-table-view>
            `,
      name: '数据表格',
      reason: '展示数据表格',
      slots,
    };
  },
};

export default table;
