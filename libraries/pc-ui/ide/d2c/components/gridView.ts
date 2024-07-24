import { ComponentConfig } from '../types';
import { randomString } from '../utils';

const gridView: ComponentConfig = {
  type: 'GridView',
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const rows = slotNodes;
    const firstRect = rows[0][0];
    const childrenIds = [firstRect.id];
    const repeat = rows[0].length;
    const templateName = `template_${randomString(componentNode.id)}`;
    return {
      id: componentNode.id,
      tag: 'u-grid-view',
      code: `
<u-grid-view 
    :dataSource="[]"
    :repeat="${repeat}"
    style="height:auto;"
>
    <template #item="current" ref="${templateName}">
    </template>
</u-grid-view>
            `,
      slots: [
        {
          templateName,
          childrenIds,
        },
      ],
      name: '数据网格',
      reason: '将数据以网格形式展示',
    };
  },
};

export default gridView;
