import {
  ComponentCodeGen,
} from '../common';

const type = 'Step';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const isVertical = componentNode.bound.height > componentNode.bound.width;
    const direction = isVertical ? 'vertical' : 'horizontal';

    return {
      id: componentNode.id,
      code: `
<el-selectable-steps style="" direction="${direction}">
    <el-selectable-step >
        <template #title>
            <el-text text="步骤1"></el-text>
        </template>
    </el-selectable-step>
    <el-selectable-step >
        <template #title>
            <el-text text="步骤2"></el-text>
        </template>
    </el-selectable-step>
    <el-selectable-step >
        <template #title>
            <el-text text="步骤3"></el-text>
        </template>
    </el-selectable-step>
</el-selectable-steps>
            `,
    };
  },
  name: '步骤条',
  reason: '进行步骤导航',
  tag: 'el-selectable-steps',
};
