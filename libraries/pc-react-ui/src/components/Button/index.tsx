import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import * as basicsPlugin from './plugins/basicsPlugin';
import type { pluginType } from '@/plugins/type';
import { Plugin, registerComponet } from '../../plugins/index';

import './button.css';

const plugin = new Plugin(basicsPlugin);
type ButtonProps = AntdButtonProps

const mapProps = {
  mySize: 'size',
};
const Button = registerComponet<ButtonProps, pluginType<ButtonProps>>(
  AntdButton,
  plugin,
  mapProps,
);

export default Button;
