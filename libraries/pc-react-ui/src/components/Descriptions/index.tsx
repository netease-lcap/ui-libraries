import './theme/vars.css';
import { ProDescriptions as AntdDescriptions } from '@ant-design/pro-components';
import type { ProDescriptionsProps } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Descriptions = registerComponet<
  ProDescriptionsProps,
  pluginType<ProDescriptionsProps>
>(
  AntdDescriptions,
  { plugin, displayName: 'descriptions', mapProps },
);

export const DescriptionsItem = AntdDescriptions.Item;
