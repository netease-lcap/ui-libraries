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

const Tabs = registerComponet<
  TabsProps,
  pluginType<TabsProps>
>(
  AntdTabs,
  { plugin, displayName: AntdTabs.displayName, mapProps },
);

// console.log(AntdTabs.TabPane);
export default Tabs;

export const { TabPane } = AntdTabs;
