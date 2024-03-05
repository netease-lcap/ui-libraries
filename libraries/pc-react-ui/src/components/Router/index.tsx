import {
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import type { BrowserRouterProps } from 'react-router-dom';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Router = registerComponet<
  BrowserRouterProps,
  pluginType<BrowserRouterProps>
>(
  Outlet,
  { plugin, displayName: 'router', mapProps },
);

// export default Router;
