import { DatePicker as AntdDatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const DatePicker = registerComponet<
  DatePickerProps,
  pluginType<DatePickerProps>
>(
  AntdDatePicker,
  { plugin, displayName: AntdDatePicker.displayName, mapProps },
);

export default DatePicker;
