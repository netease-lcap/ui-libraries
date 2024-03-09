import classnames from 'classnames';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useControllableValue } from 'ahooks';

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
  const defaultStartDate = _.isNil(defaultStartDateProps) ? undefined : dayjs(defaultStartDateProps);
  const defaultEndDate = _.isNil(defaultEndDateProps) ? undefined : dayjs(defaultEndDateProps);
  const defaultValue = _.isEmpty([defaultStartDate, defaultEndDate].filter(Boolean)) ? undefined : [defaultStartDate, defaultEndDate];
  const valueProps = _.isEmpty([startDate, endDate].filter(Boolean)) ? undefined : [startDate, endDate];
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, defaultValue, onChange: wrapChange }));
  return {
    value,
    onChange,
    allowEmpty: [startEmpty, endEmpty],
  };
}
