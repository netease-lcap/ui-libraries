import { Dropdown as AntdDropdown } from 'antd';
import type { DropDownProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Dropdown = registerComponet<
  DropDownProps,
  pluginType<DropDownProps>
>(
  AntdDropdown,
  { plugin, displayName: AntdDropdown.displayName, mapProps },
);
