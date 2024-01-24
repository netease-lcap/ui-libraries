import { InputNumber as AntdInputNumber } from 'antd';
import type { InputNumberProps as AntdInputNumberProps } from 'antd';
import * as basicsPlugin from './plugins/basicsPlugin';
import type { pluginType } from '@/plugins/type';
import { registerComponet } from '../../plugins/index';

import './index.module.less';

type InputNumberProps = AntdInputNumberProps

const mapProps = {
  mySize: 'size',
};

const InputNumber = registerComponet<InputNumberProps, pluginType<InputNumberProps>>(
  AntdInputNumber,
  { plugin: basicsPlugin, displayName: AntdInputNumber.displayName, mapProps },
);

export default InputNumber;
