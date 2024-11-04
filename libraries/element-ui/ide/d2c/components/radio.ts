import {
  ComponentCodeGen,
} from '../common';

const type = 'RadioGroup';

export const RadioGroupType = type;

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const radioListCode = textNodes
      .map((textNode) => {
        return `<el-radio-pro><el-text text="${textNode.attrs.text}"></el-text></el-radio-pro>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      code: `<el-radio-group-pro style="">${radioListCode}</el-radio-group-pro>`,
    };
  },
  name: '单选组',
  reason: '进行单选',
  tag: 'el-radio-group-pro',
};
