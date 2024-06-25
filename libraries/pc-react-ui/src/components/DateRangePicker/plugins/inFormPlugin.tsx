import React from 'react';
import { ProFormDateTimeRangePicker } from '@ant-design/pro-components';
// import FormContext from '@/components/Form/form-context';
// import FormContext from '@/components/Form/form-context';
import FormContext from '../../Form/form-context';

export function useHandleName(props) {
  const { isForm } = React.useContext(FormContext);
  if (!isForm) return {};
  const startName = props.get('startName');
  const endName = props.get('endName');
  const showTime = props.get('showTime');
  const getIosTime = (localShowTime, time) => {
    return localShowTime ? new Date(time).toJSON() : time;
  };
  const transform = (values) => {
    return {
      [startName]: values ? getIosTime(showTime, values[0]) : undefined,
      [endName]: values ? getIosTime(showTime, values[1]) : undefined,
    };
  };
  return {
    transform,
    name: startName + endName,
  };
}
export function useHandleFormItemComponent(props) {
  return {
    FormItemComponent: ProFormDateTimeRangePicker,
  };
}
useHandleFormItemComponent.order = 2;
