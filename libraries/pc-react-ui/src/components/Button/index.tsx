import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import * as basicsPlugin from './plugins/basicsPlugin';
import type { pluginType } from '@/plugins/type';
import { Plugin, registerComponet } from '../../plugins/index';

// import './button.css';

type ButtonProps = AntdButtonProps

const mapProps = {
  mySize: 'size',
};
const plugin = new Plugin(basicsPlugin, { displayName: 'Button', mapProps });

const Button = registerComponet<ButtonProps, pluginType<ButtonProps>>(
  AntdButton,
  plugin,
);

export default Button;
