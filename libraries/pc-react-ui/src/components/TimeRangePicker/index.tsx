import { TimePicker as AntdTimePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd/lib/time-picker';

import {
  // ProFormDateTimeRangePicker,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

const { RangePicker: AntdRangePicker } = AntdTimePicker;
const ProFormDateTimeRangePicker = ProFormTimePicker.RangePicker;

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

export const TimeRangePicker = registerComponet<
  TimeRangePickerProps,
  pluginType<TimeRangePickerProps>
>(
  ProFormDateTimeRangePicker,
  { plugin, displayName: AntdRangePicker.displayName, mapProps },
);

// export default TimeRangePicker;
