import classnames from 'classnames';

import locale from 'antd/lib/date-picker/locale/zh_CN';
import style from '../index.module.less';
import 'dayjs/locale/zh-cn';

export function useHandleLocale() {
  return {
    locale,
  };
}

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.timeRangePicker, className),
  };
}
