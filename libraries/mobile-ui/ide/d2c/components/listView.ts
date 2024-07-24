import { ComponentConfig } from '../types';
import { randomString } from '../utils';

const listView: ComponentConfig = {
  type: 'ListView',
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const firstRect = slotNodes[0][0];
    const childrenIds = [firstRect.id];
    const templateName = `template_${randomString(componentNode.id)}`;
    return {
      id: componentNode.id,
      tag: 'van-list-view',
      code: `
<van-list-view :pageable="'load-more'" :vusion-disabled-addslot="true" :pageSize="20" :dataSource="[]">
  <template #next>
      <van-text :text="'下一页'"></van-text>
  </template>
  <template #prev>
      <van-text :text="'上一页'"></van-text>
  </template>
  <template #item="current" ref="${templateName}">
  </template>
</van-list-view>
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
