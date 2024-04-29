import type { BrowserRouterProps } from 'react-router-dom';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/otype';

import './index.module.less';

// export { RouterProvider as Router } from 'react-router-dom';

export { RouterProvider, Outlet as Router } from 'react-router-dom';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};
export { RouterContext } from './router-context';
// export const Router = registerComponet<
//   BrowserRouterProps,
//   pluginType<BrowserRouterProps>
// >(
//   Outlet,
//   { plugin, displayName: 'router', mapProps },
// );

// export default Router;
