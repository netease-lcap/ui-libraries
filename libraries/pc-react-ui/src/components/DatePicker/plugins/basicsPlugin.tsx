import locale from 'antd/lib/date-picker/locale/zh_CN';
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import _ from 'lodash';
import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
import style from '../index.module.less';

export function useHandleLocale() {
  return {
    locale,
  };
}
export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const valueFormat = _.isNil(valueProps) ? valueProps : dayjs(valueProps);
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueFormat }));
  return {
    value,
    onChange(time) {
      _.attempt(onChangeProps, time.format('DD/MM/YYYY'));
      onChange(value);
    },
  };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.datePicker, className),
  };
}
