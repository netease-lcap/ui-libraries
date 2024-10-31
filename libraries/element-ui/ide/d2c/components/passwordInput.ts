import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'PasswordInput';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `<el-input-pro style="${styleStr}" type="password" />`,
    };
  },
  name: '密码输入框',
  reason: '进行密码输入',
  tag: 'el-input-pro',
};
