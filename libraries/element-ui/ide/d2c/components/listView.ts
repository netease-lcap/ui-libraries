import {
  ComponentCodeGen,
  randomString,
  styleObjToStr,
} from '../common';

const type = 'ListView';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes, allNodes, slotNodes) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width, '--list-view-item-padding': '0' });
    const firstRect = slotNodes[0]?.[0];
    if (!firstRect) {
      return null;
    }
    const childrenIds = [firstRect.id];
    const templateName = `template_${randomString(componentNode.id)}`;

    return {
      id: componentNode.id,
      code: `
<el-list-view
    style="${styleStr}"
    :dataSource="[]"
>
    <template #item="current" ref="${templateName}">
    </template>
</el-list-view>
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
  name: '数据列表',
  reason: '将数据以列表形式展示',
  tag: 'el-list-view',
};
