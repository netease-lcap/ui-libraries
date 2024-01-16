import { InputNumber as AntdInputNumber } from 'antd';
import type { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';
import * as basicsPlugin from './plugins/basicsPlugin';
import type { pluginType } from '@/plugins/type';
import { Plugin, registerComponet } from '../../plugins/index';

import './index.module.less';

type InputNumberProps = AntdInputNumberProps

const mapProps = {
  mySize: 'size',
};
const plugin = new Plugin(basicsPlugin, { displayName: 'Button', mapProps });

const InputNumber = registerComponet<InputNumberProps, pluginType<InputNumberProps>>(
  AntdInputNumber,
  plugin,
);

export default InputNumber;
