import { ComponentConfig } from '../types';

const radio: ComponentConfig = {
  type: 'RadioGroup',
  generateCode: (componentNode, textNodes) => {
    const radioListCode = textNodes
      .map((textNode) => {
        return `<u-radio><template #item><u-text text="${textNode.attrs.text}"></u-text></template></u-radio>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      tag: 'u-radios',
      code: `<u-radios>${radioListCode}</u-radios>`,
      name: '单选组',
      reason: '进行单选',
    };
  },
};

export default radio;
