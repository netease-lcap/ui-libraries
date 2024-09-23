import VueCompositionAPI from '@vue/composition-api';
import _DatePicker from './DatePicker';
import _DatePickerPanel from './DatePickerPanel';
import _DateRangePicker from './DateRangePicker';
import _DateRangePickerPanel from './DateRangePickerPanel';
import withInstall from '../utils/withInstall';
import {
  ElDatePickerProps, ElDateRangePickerProps, ElDatePickerPanelProps, ElDateRangePickerPanelProps,
} from './type';

import './style';

export * from './type';
export type DatePickerProps = ElDatePickerProps;
export type DatePickerPanelProps = ElDatePickerPanelProps;
export type DateRangePickerProps = ElDateRangePickerProps;
export type DateRangePickerPanelProps = ElDateRangePickerPanelProps;

export const DatePicker = withInstall(_DatePicker, VueCompositionAPI);
export const DatePickerPanel = withInstall(_DatePickerPanel, VueCompositionAPI);
export const DateRangePicker = withInstall(_DateRangePicker, VueCompositionAPI);
export const DateRangePickerPanel = withInstall(_DateRangePickerPanel, VueCompositionAPI);

export default DatePicker;
