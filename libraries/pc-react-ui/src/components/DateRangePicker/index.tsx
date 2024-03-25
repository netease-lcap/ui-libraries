import { DatePicker as AntdDatePicker } from 'antd';

import { ProFormDateRangePicker } from '@ant-design/pro-components';
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

export const DateRangePicker = registerComponet<
  RangePickerProps,
  pluginType<RangePickerProps>
>(
  ProFormDateRangePicker,
  { plugin, displayName: AntdRangePicker.displayName, mapProps },
);
