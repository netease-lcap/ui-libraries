import { TimePicker as AntdTimePicker } from 'antd';

import { ProFormTimePicker } from '@ant-design/pro-components';
import type { TimePickerProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const TimePicker = registerComponet<
  TimePickerProps,
  pluginType<TimePickerProps>
>(
  ProFormTimePicker,
  { plugin, displayName: AntdTimePicker.displayName, mapProps },
);

// export default TimePicker;
