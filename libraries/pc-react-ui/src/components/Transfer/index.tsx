import { Transfer as AntdTransfer } from 'antd';
import type { TransferProps, TransferItem } from 'antd/lib/transfer';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  // mySize: 'size',
};

// export const Transfer = registerComponet<
//   TransferProps<TransferItem>,
//   pluginType<TransferProps<TransferItem>>
// >(
//   AntdTransfer,
//   { plugin, displayName: AntdTransfer.displayName, mapProps },
// );

export const Transfer = AntdTransfer;
