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
    const styleStr = styleObjToStr({ width, height: 'auto' });
    const firstRect = slotNodes[0]?.[0];
    if (!firstRect) {
      return null;
    }
    const childrenIds = [firstRect.id];
    const templateName = `template_${randomString(componentNode.id)}`;

    return {
      id: componentNode.id,
      code: `
<el-list-components
    style="${styleStr}"
    :colnum="1"
    :dataSource="[]"
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
  name: '组件列表-单列',
  reason: '将数据以列表形式展示',
  tag: 'el-list-components',
};
