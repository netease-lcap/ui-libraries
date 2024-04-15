import { Menu as AntdMenu } from 'antd';
import type { MenuProps, MenuItemProps } from 'antd';
import {
  ProLayout as AntdProLayout,
} from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // mySize: 'size',
};

export const ProLayout = registerComponet<
  MenuProps,
  pluginType<MenuItemProps>
>(
  AntdProLayout,
  { plugin, displayName: AntdProLayout.displayName, mapProps },
);
