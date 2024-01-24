import { Breadcrumb as AntdBreadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Breadcrumb = registerComponet<
  BreadcrumbProps,
  pluginType<BreadcrumbProps>
>(
  AntdBreadcrumb,
  { plugin, displayName: AntdBreadcrumb.displayName, mapProps },
);

export default Breadcrumb;
export const BreadcrumbItem = AntdBreadcrumb.Item;
