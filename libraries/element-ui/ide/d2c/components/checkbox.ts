import {
  ComponentCodeGen,
} from '../common';

const type = 'CheckboxGroup';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const checkboxListCode = textNodes
      .map((textNode) => {
        return `<el-checkbox-pro><el-text text="${textNode.attrs.text}"></el-text></el-checkbox-pro>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      code: `<el-checkbox-group-pro style="">${checkboxListCode}</el-checkbox-group-pro>`,
    };
  },
  name: '多选组',
  reason: '进行多选',
  tag: 'el-checkbox-group-pro',
};
