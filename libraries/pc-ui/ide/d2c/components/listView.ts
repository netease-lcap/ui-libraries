import { ComponentConfig } from '../types';
import { randomString } from '../utils';

const listView: ComponentConfig = {
  type: 'ListView',
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const { width } = componentNode.bound;

    const firstRect = slotNodes[0][0];
    const childrenIds = [firstRect.id];
    const templateName = `template_${randomString(componentNode.id)}`;
    return {
      id: componentNode.id,
      tag: 'u-list-view',
      code: `
<u-list-view
    style="width:${width}px"
    :dataSource="[]"
>
    <template #item="current" ref="${templateName}">
    </template>
</u-list-view>
            `,
      slots: [
        {
          templateName,
          childrenIds,
        },
      ],
      name: '数据列表',
      reason: '将数据以列表形式展示',
    };
  },
};

export default listView;
