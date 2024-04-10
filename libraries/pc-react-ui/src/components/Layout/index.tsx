import { Layout as AntdLayout } from 'antd';
// import { Layout as AntdTag } from 'antd';
import type { LayoutProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Layout = registerComponet<
  LayoutProps,
  pluginType<LayoutProps>
>(
  AntdLayout,
  { plugin, displayName: AntdLayout.displayName, mapProps },
);

// export default Tag;
