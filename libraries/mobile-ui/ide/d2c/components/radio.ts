import { ComponentConfig } from '../types';

const radio: ComponentConfig = {
  type: 'RadioGroup',
  generateCode: (componentNode, textNodes) => {
    const radioListCode = textNodes
      .map((textNode) => {
        return `<van-radio><van-text text="${textNode.attrs.text}"></van-text></van-radio>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      tag: 'van-radio-group',
      code: `<van-radio-group direction="horizontal">${radioListCode}</van-radio-group>`,
      name: '单选组',
      reason: '进行单选',
    };
  },
};

export default radio;
