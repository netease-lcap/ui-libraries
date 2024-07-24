import locale from 'antd/lib/date-picker/locale/zh_CN';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
// import FormContext from '@/components/Form/form-context';
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
export function useHandleShowTime(props) {
  const showTime = props.get('showTime');
  const formatProps = props.get('format');
  const format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  return {
    format: formatProps ?? format,
  };
}
export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const showTime = props.get('showTime');
  const startDate = _.isValidTime(_.get(valueProps, '0')) ? dayjs(_.get(valueProps, '0')) : undefined;
  const endDate = _.isValidTime(_.get(valueProps, '1')) ? dayjs(_.get(valueProps, '1')) : undefined;
  const valueFormat = _.isEmpty([startDate, endDate].filter(Boolean)) ? valueProps : [startDate, endDate];
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueFormat }));
  return {
    value,
    onChange(time) {
      if (_.isNil(time)) {
        _.attempt(onChangeProps, time);
        // onChange(time);
      } else {
        const formatTime = _.cond([
          [_.conforms({ time: _.isNil, showTime: _.stubTrue }), _.constant(time)],
          [_.conforms({ showTime: Boolean }), ({ time: selfTime }) => new Date(selfTime?.format()).toJSON()],
          [_.stubTrue, ({ time: selfTime }) => selfTime?.format('YYYY-MM-DD')],
        ]);
        _.attempt(onChangeProps, [formatTime({ time: time[0], showTime }), formatTime({ time: time[1], showTime })]);
        // onChange(time);
      }
    },
  };
}
