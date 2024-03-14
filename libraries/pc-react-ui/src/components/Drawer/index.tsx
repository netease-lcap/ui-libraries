import { Drawer as AntdDrawer } from 'antd';
import type { DrawerProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Drawer = registerComponet<
  DrawerProps,
  pluginType<DrawerProps>
>(
  AntdDrawer,
  { plugin, displayName: AntdDrawer.displayName, mapProps },
);

// export default Drawer;
