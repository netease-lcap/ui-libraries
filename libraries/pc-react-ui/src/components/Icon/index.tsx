import { Radio as AntdRadio } from 'antd';
import antdIcon from '@ant-design/icons';

import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

type IconProps = typeof antdIcon;
const mapProps = {
  mySize: 'size',
};

const Icon = registerComponet<
  IconProps,
  pluginType<IconProps>
>(
  AntdRadio,
  { plugin, displayName: antdIcon.displayName, mapProps },
);

export default Icon;

export const RadioGroup = AntdRadio.Group;
export const RadioButton = AntdRadio.Button;
