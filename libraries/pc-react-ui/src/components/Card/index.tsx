// import { ProCard as AntdCard } from '@ant-design/pro-components';
// import type { ProCardProps } from '@ant-design/pro-components';
import { CardProps, Card as AntdCard } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Card = registerComponet<
  CardProps,
  pluginType<CardProps>
>(
  AntdCard,
  { plugin, displayName: 'descriptions', mapProps },
);

// export const CardTabPane = AntdCard.TabPane;
// export const CardDivider = AntdCard.Divider;

// export const CardGroup = AntdCard.Group;
