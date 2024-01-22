import { Tabs as AntdTabs } from 'antd';
import type { TabsProps } from 'antd/lib/tabs';
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

export default Tabs;
