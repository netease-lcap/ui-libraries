import { Switch as AntdSwitch } from 'antd';
import type { SwitchProps } from 'antd';

import { ProFormSwitch } from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const Switch = registerComponet<
  SwitchProps,
  pluginType<SwitchProps>
>(
  ProFormSwitch,
  { plugin, displayName: AntdSwitch.displayName, mapProps },
);

// export default Switch;
