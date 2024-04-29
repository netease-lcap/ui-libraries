import { Input as AntdInput } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';

import { ProFormTextArea } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const { TextArea: AntdTextArea } = AntdInput;

const mapProps = {
  mySize: 'size',
};

export const TextArea = registerComponet<
  TextAreaProps,
  pluginType<TextAreaProps>
>(
  ProFormTextArea,
  { plugin, displayName: AntdTextArea.displayName, mapProps },
);

// export default TextArea;
