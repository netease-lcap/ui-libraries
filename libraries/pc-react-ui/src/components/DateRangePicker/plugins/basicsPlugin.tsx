import locale from 'antd/lib/date-picker/locale/zh_CN';
import React from 'react';
import 'dayjs/locale/zh-cn';
import classnames from 'classnames';
import style from '../index.module.less';

export function useHandleLocale() {
  return {
    locale,
  };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.dateRangePicker, className),
  };
}
