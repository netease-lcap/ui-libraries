import { Input as AntdInput } from 'antd';
import type { InputProps } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import * as formInputPlugin from './plugins/formInputPlugin';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const mapProps = {
  mySize: 'size',
};

export const Input = registerComponet<
  InputProps,
  pluginType<InputProps>
>(
  AntdInput,
  { plugin, displayName: AntdInput.displayName, mapProps },
);

export const FormInput = registerComponet<
  InputProps,
  pluginType<InputProps>
>(
  Input,
  { plugin: formInputPlugin, displayName: AntdInput.displayName, mapProps },
);

// export default Input;

// export const { TextArea } = AntdInput;
