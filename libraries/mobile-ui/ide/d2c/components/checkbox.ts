import { ComponentConfig } from '../types';

const checkbox: ComponentConfig = {
  type: 'CheckboxGroup',
  generateCode: (componentNode, textNodes) => {
    const checkboxListCode = textNodes
      .map((textNode) => {
        return `<van-checkbox shape="square"><van-text text="${textNode.attrs.text}"></van-text></van-checkbox>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      tag: 'van-checkbox-group',
      code: `<van-checkbox-group direction="horizontal">${checkboxListCode}</van-checkbox-group>`,
      name: '多选组',
      reason: '进行多选',
    };
  },
};

export default checkbox;
