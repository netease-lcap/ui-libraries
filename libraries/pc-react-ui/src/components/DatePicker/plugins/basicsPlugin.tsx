import locale from 'antd/lib/date-picker/locale/zh_CN';
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
  const showTime = props.get('showTime');
  const valueFormat = dayjs(valueProps).isValid() ? dayjs(valueProps) : undefined;
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueFormat }));
  return {
    value,
    onChange(time) {
      const formatTime = _.cond([
        [_.conforms({ time: _.isNil, showTime: _.stubTrue }), _.constant(time)],
        [_.conforms({ showTime: Boolean }), _.constant(new Date(time?.format()).toJSON())],
        [_.stubTrue, _.constant(time?.format('YYYY-MM-DD'))],
      ])({ time, showTime });
      _.attempt(onChangeProps, formatTime);
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
