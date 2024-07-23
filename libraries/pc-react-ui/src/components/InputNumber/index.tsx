import { InputNumber as AntdInputNumber } from 'antd';
import type { InputNumberProps as AntdInputNumberProps } from 'antd';
import * as basicsPlugin from './plugins/index';
// import type { pluginType } from '@/plugins/type';
import { registerComponet } from '../../plugins/index';

import './index.module.less';

type InputNumberProps = AntdInputNumberProps

const mapProps = {
  // mySize: 'size',
};

export const InputNumber = registerComponet<InputNumberProps, InputNumberProps>(
  AntdInputNumber,
  { plugin: basicsPlugin, displayName: 'InputNumber', mapProps },

);
InputNumber.defaultProps = {
  placeholder: '请输入数字',
  min: Number.MIN_SAFE_INTEGER,
  precision: 1,
};
