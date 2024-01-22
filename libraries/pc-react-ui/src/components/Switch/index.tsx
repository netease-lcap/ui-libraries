import { Switch as AntdSwitch } from 'antd';
import type { SwitchProps } from 'antd/lib/switch';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Switch = registerComponet<
  SwitchProps,
  pluginType<SwitchProps>
>(
  AntdSwitch,
  { plugin, displayName: 'Tabs', mapProps },
);

export default Switch;
