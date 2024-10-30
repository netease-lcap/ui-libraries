import {
  ComponentCodeGen,
} from '../common';

const type = 'CheckboxGroup';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const checkboxListCode = textNodes
      .map((textNode) => {
        return `<el-checkbox><template #item><el-text text="${textNode.attrs.text}"></el-text></template></el-checkbox>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      code: `<el-checkboxes style="--checkbox-space-x: 36px;">${checkboxListCode}</el-checkboxes>`,
    };
  },
  name: '多选组',
  reason: '进行多选',
  tag: 'el-checkboxes',
};
