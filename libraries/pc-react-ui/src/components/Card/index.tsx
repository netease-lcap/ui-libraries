import './theme/vars.css';
import { ProCard as AntdCard } from '@ant-design/pro-components';
import type { ProCardProps } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Card = registerComponet<
  ProCardProps,
  pluginType<ProCardProps>
>(
  AntdCard,
  { plugin, displayName: 'descriptions', mapProps },
);

export const CardTabPane = AntdCard.TabPane;
export const CardDivider = AntdCard.Divider;

export const CardGroup = AntdCard.Group;
