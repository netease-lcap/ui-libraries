import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';
import * as basicsPlugin from './plugins/index';
import type { pluginType } from '@/plugins/type';
import { registerComponet } from '@/plugins/index';
import type { BasePlugin } from '@/types/plugins';

// import './button.css';

export type ButtonProps = AntdButtonProps & BasePlugin

const mapProps = {
  mySize: 'size',
};

export const Button = registerComponet<ButtonProps, pluginType<ButtonProps>>(
  AntdButton,
  { plugin: basicsPlugin, displayName: AntdButton.displayName, mapProps },
);
