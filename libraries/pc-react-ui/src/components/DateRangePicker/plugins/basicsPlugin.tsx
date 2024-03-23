import locale from 'antd/lib/date-picker/locale/zh_CN';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
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

export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const showTime = props.get('showTime');
  const startDate = _.isNil(_.get(valueProps, '0')) ? undefined : dayjs(_.get(valueProps, '0'));
  const endDate = _.isNil(_.get(valueProps, '1')) ? undefined : dayjs(_.get(valueProps, '1'));
  const valueFormat = _.isEmpty([startDate, endDate].filter(Boolean)) ? valueProps : [startDate, endDate];
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueFormat }));
  return {
    value,
    onChange(time) {
      if (_.isNil(time)) {
        _.attempt(onChangeProps, time);
        onChange(time);
      } else {
        const formatTime = _.cond([
          [_.conforms({ time: _.isNil, showTime: _.stubTrue }), _.constant(time)],
          [_.conforms({ showTime: Boolean }), ({ time: selfTime }) => new Date(selfTime?.format()).toJSON()],
          [_.stubTrue, ({ time: selfTime }) => selfTime?.format('YYYY-MM-DD')],
        ]);
        _.attempt(onChangeProps, [formatTime({ time: time[0], showTime }), formatTime({ time: time[1], showTime })]);
        onChange(time);
      }
      // _.attempt(onChangeProps, time.format('DD/MM/YYYY'));
      // onChange(value);
    },
  };
}

function useHandleValueToStartAndEnd(props) {
  const startDateProps = props.get('startDate');
  const endDateProps = props.get('endDate');
  const startEmpty = props.get('startEmpty', false);
  const endEmpty = props.get('endEmpty', false);
  const defaultStartDateProps = props.get('defaultStartDate');
  const defaultEndDateProps = props.get('defaultEndDate');
  const onEndDateChange = props.get('onEndDateChange', () => { });
  const onStartDateChange = props.get('onStartDateChange', () => { });
  const onChangeProps = props.get('onChange', () => { });
  const wrapChange = _.wrap(onChangeProps, (fn, date, dateString) => {
    _.attempt(fn, date, dateString);
    _.attempt(onStartDateChange, _.get(dateString, '0'));
    _.attempt(onEndDateChange, _.get(dateString, '1'));
  });
  const startDate = _.isNil(startDateProps) ? undefined : dayjs(startDateProps);
  const endDate = _.isNil(endDateProps) ? undefined : dayjs(endDateProps);
  const valueProps = _.isEmpty([startDate, endDate].filter(Boolean)) ? undefined : [startDate, endDate];
  const defaultStartDate = _.isNil(defaultStartDateProps) ? undefined : dayjs(defaultStartDateProps);
  const defaultEndDate = _.isNil(defaultEndDateProps) ? undefined : dayjs(defaultEndDateProps);
  const defaultValue = _.isEmpty([defaultStartDate, defaultEndDate].filter(Boolean)) ? undefined : [defaultStartDate, defaultEndDate];
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, defaultValue, onChange: wrapChange }));
  return {
    value,
    onChange,
    allowEmpty: [startEmpty, endEmpty],
  };
}
