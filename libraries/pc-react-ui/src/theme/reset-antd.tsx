/* eslint-disable no-underscore-dangle */
import React from 'react';
import { transPlacement2DropdownAlign } from 'antd/es/date-picker/util';
import {
  AutoComplete,
  DatePicker,
  Dropdown,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  ColorPicker,
  Cascader,
} from 'antd';
import genPurePanel from './PurePanel';

DatePicker._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(DatePicker, 'picker', null, (props: any) => {
  const dropdownAlign = transPlacement2DropdownAlign(props.direction, props.placement);

  dropdownAlign.overflow!.adjustY = false;
  dropdownAlign.overflow!.adjustX = false;

  return {
    ...props,
    dropdownAlign,
  };
});
DatePicker._InternalRangePanelDoNotUseOrYouWillBeFired = genPurePanel(DatePicker.RangePicker, 'picker', null, (props: any) => {
  const dropdownAlign = transPlacement2DropdownAlign(props.direction, props.placement);

  dropdownAlign.overflow!.adjustY = false;
  dropdownAlign.overflow!.adjustX = false;

  return {
    ...props,
    dropdownAlign,
  };
});

const DropdownPurePanel = genPurePanel(Dropdown, 'dropdown', (prefixCls) => prefixCls, (props: any) => {
  return {
    ...props,
    align: {
      overflow: {
        adjustX: false,
        adjustY: false,
      },
    },
  };
});

Dropdown._InternalPanelDoNotUseOrYouWillBeFired = (props) => (
  <DropdownPurePanel {...props}>
    <span />
  </DropdownPurePanel>
);

ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(
  ColorPicker,
  'color-picker',
  /* istanbul ignore next */
  (prefixCls) => prefixCls,
  (props: any) => ({
    ...props,
    placement: 'bottom' as any,
    autoAdjustOverflow: false,
  }),
);

AutoComplete._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(AutoComplete);
Cascader._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(Cascader);
Mentions._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(Mentions, 'mentions');
Select._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(Select);
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(TimePicker, 'picker');
TreeSelect._InternalPanelDoNotUseOrYouWillBeFired = genPurePanel(TreeSelect);
