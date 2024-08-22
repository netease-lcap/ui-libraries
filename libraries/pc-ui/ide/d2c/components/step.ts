import { ComponentConfig } from '../types';

const step: ComponentConfig = {
  type: 'Step',
  generateCode: (componentNode) => {
    const isVertical = componentNode.bound.height > componentNode.bound.width;
    const direction = isVertical ? 'vertical' : 'horizontal';

    return {
      id: componentNode.id,
      tag: 'u-selectable-steps',
      code: `
<u-selectable-steps direction="${direction}">
    <u-selectable-step >
        <template #title>
            <u-text text="步骤1"></u-text>
        </template>
    </u-selectable-step>
    <u-selectable-step >
        <template #title>
            <u-text text="步骤2"></u-text>
        </template>
    </u-selectable-step>
    <u-selectable-step >
        <template #title>
            <u-text text="步骤3"></u-text>
        </template>
    </u-selectable-step>
</u-selectable-steps>
            `,
      name: '步骤条',
      reason: '进行步骤导航',
    };
  },
};

export default step;
