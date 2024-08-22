import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { ProFormTimePicker } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import style from '../index.module.less';
import 'dayjs/locale/zh-cn';

export function useHandleLocale() {
  return {
    locale,
  };
}
export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange', () => { });
  const valueFormat = props.has('value') ? dayjs(valueProps, 'HH:mm:ss') : undefined;
  const [value, onChange] = useControllableValue({ ..._.controllableValue(props), value: valueFormat });
  return {
    value,
    onChange(time) {
      const formatTime = _.isNil(time) ? time : time?.format('HH:mm:ss');
      _.attempt(onChangeProps, formatTime);
      // onChange(value);
    },
  };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.timePicker, className),
  };
}

export function useHandleFormItemComponent() {
  return {
    FormItemComponent: ProFormTimePicker,
  };
}
useHandleFormItemComponent.order = 2;
