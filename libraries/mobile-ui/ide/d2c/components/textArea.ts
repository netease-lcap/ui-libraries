import { ComponentConfig } from '../types';

const textArea: ComponentConfig = {
  type: 'TextArea',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const { text } = textNode.attrs;
    const { width } = componentNode.bound;
    const { height } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-textarea',
      code: `<u-textarea placeholder="${text}" style="width:${width}px;height:${height}px;" />`,
      name: '多行输入框',
      reason: '进行多行输入',
    };
  },
};

export default textArea;
