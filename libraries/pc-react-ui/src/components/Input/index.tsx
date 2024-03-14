import './theme/vars.css';
import { Input as AntdInput } from 'antd';
import type { InputProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
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

// export default Input;

// export const { TextArea } = AntdInput;
