import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import * as basicsPlugin from './plugins/basicsPlugin';
import type { pluginType } from '@/plugins/type';
import { registerComponet } from '../../plugins/index';
import type { BasePlugin } from '@/types/plugins';

// import './button.css';

export type ButtonProps = AntdButtonProps & BasePlugin

const mapProps = {
  mySize: 'size',
};

const Button = registerComponet<ButtonProps, pluginType<ButtonProps>>(
  AntdButton,
  { plugin: basicsPlugin, displayName: 'Button', mapProps },
);

export default Button;
