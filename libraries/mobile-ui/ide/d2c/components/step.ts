import { ComponentConfig } from '../types';

const step: ComponentConfig = {
  type: 'Step',
  generateCode: (componentNode) => {
    const isVertical = componentNode.bound.height > componentNode.bound.width;
    const direction = isVertical ? 'vertical' : 'horizontal';

    return {
      id: componentNode.id,
      tag: 'van-steps',
      code: `
<van-steps direction="${direction}">
    <template #item="current">
        <van-step :vusion-disabled-cut="true" :vusion-disabled-copy="true">
            <van-text :text="'步骤名'"></van-text>
        </van-step>
    </template>
    <van-step>
        <van-text :text="'买家下单'"></van-text>
    </van-step>
    <van-step>
        <van-text :text="'商家接单'"></van-text>
    </van-step>
    <van-step>
        <van-text :text="'买家提货'"></van-text>
    </van-step>
    <van-step>
        <van-text :text="'交易完成'"></van-text>
    </van-step>
</van-steps>
            `,
      name: '步骤条',
      reason: '进行步骤导航',
    };
  },
};

export default step;
