import { ComponentConfig } from '../types';

const passwordInput: ComponentConfig = {
  type: 'PasswordInput',
  generateCode: (componentNode, textNodes) => {
    const { text } = textNodes[0].attrs;
    const width = textNodes[0].bound.width + 5;

    return {
      // 在 h5 中，把文本节点作为输入框
      id: textNodes[0].id,
      tag: 'van-fieldinput',
      code: `<van-fieldinput placeholder='${text}' type='password' style="width:${width}px"/>`,
      name: '密码输入框',
      reason: '进行密码输入',
    };
  },
};

export default passwordInput;
