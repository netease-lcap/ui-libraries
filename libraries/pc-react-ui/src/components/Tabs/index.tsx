import { Tabs as AntdTabs } from 'antd';
import type { TabsProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Tabs = registerComponet<
  TabsProps,
  pluginType<TabsProps>
>(
  AntdTabs,
  { plugin, displayName: AntdTabs.displayName, mapProps },
);
// export const TabPane = registerComponet<
//   TabsProps,
//   pluginType<TabsProps>
// >(
//   AntdTabs.Tab,
//   { plugin, displayName: AntdTabs.displayName, mapProps },
// );
// // console.log(AntdTabs.TabPane);
// export const Tabs = AntdTabs;
// export default Tabs;

export const { TabPane } = AntdTabs;
