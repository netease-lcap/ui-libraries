import {
  randomString,
  ComponentCodeGen,
  styleObjToStr,
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
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width, height: 'auto' });
    return {
      id: componentNode.id,
      code: `
<el-list-components 
    :dataSource="[]"
    :colnum="${repeat}"
    style="${styleStr}"
>
    <template #default="current" ref="${templateName}">
    </template>
</el-list-components>
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
  name: '组件列表-多列',
  reason: '将数据以网格形式展示',
  tag: 'el-list-components',
};
