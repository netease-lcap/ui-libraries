import { ComponentConfig } from '../types';

const checkbox: ComponentConfig = {
  type: 'CheckboxGroup',
  generateCode: (componentNode, textNodes) => {
    const checkboxListCode = textNodes
      .map((textNode) => {
        return `<u-checkbox><template #item><u-text text="${textNode.attrs.text}"></u-text></template></u-checkbox>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      tag: 'u-checkboxes',
      code: `<u-checkboxes style="--checkbox-space-x: 36px;">${checkboxListCode}</u-checkboxes>`,
      name: '多选组',
      reason: '进行多选',
    };
  },
};

export default checkbox;
