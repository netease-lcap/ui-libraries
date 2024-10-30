import {
  randomString,
  ComponentCodeGen,
} from '../common';

const type = 'GridView';

export const GridViewType = type;

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const rows = slotNodes;
    const firstRect = rows[0]?.[0];
    if (!firstRect) {
      return null;
    }
    const childrenIds = [firstRect.id];
    const repeat = rows[0].length;
    const templateName = `template_${randomString(componentNode.id)}`;
    return {
      id: componentNode.id,
      code: `
<el-grid-view 
    :dataSource="[]"
    :repeat="${repeat}"
    style="height:auto;"
>
    <template #item="current" ref="${templateName}">
    </template>
</el-grid-view>
            `,
      slots: [
        {
          templateName,
          childrenIds,
          childrenStyle: {
            width: 'auto',
          },
        },
      ],
    };
  },
  name: '数据网格',
  reason: '将数据以网格形式展示',
  tag: 'el-grid-view',
};
