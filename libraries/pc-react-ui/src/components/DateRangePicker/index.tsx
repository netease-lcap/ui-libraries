import { DatePicker as AntdDatePicker } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const { RangePicker: AntdRangePicker } = AntdDatePicker;

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const DateRangePicker = registerComponet<
  RangePickerProps,
  pluginType<RangePickerProps>
>(
  AntdRangePicker,
  { plugin, displayName: AntdRangePicker.displayName, mapProps },
);

export default DateRangePicker;
