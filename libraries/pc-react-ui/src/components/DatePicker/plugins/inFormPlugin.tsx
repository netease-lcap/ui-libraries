import React from 'react';
import { ProFormDateTimePicker } from '@ant-design/pro-components';
import FormContext from '@/components/Form/form-context';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleShowTime(props) {
  const { isForm } = React.useContext(FormContext);
  if (!isForm) return {};
  const showTime = props.get('showTime');
  const formatProps = props.get('format');
  const format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

  return {
    format: formatProps ?? format,
    transform(value, name) {
      return {
        [name]: showTime ? new Date(value).toJSON() : value,
      };
    },
  };
}

export function useHandleFormItemComponent(props) {
  return {
    FormItemComponent: ProFormDateTimePicker,
  };
}
useHandleFormItemComponent.order = 2;
