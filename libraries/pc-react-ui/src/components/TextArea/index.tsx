import './theme/vars.css';
import { Input as AntdInput } from 'antd';
import type { InputProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const { TextArea: AntdTextArea } = AntdInput;

const mapProps = {
  mySize: 'size',
};

export const TextArea = registerComponet<
  InputProps,
  pluginType<InputProps>
>(
  AntdTextArea,
  { plugin, displayName: AntdTextArea.displayName, mapProps },
);

// export default TextArea;
