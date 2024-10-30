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
        return `<el-radio><template #item><el-text text="${textNode.attrs.text}"></el-text></template></el-radio>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      code: `<el-radios style="">${radioListCode}</el-radios>`,
    };
  },
  name: '单选组',
  reason: '进行单选',
  tag: 'el-radios',
};
