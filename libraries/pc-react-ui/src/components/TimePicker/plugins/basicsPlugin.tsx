import classnames from 'classnames';
import dayjs from 'dayjs';
import { useControllableValue } from 'ahooks';
import React from 'react';
import _ from 'lodash';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import { $deletePropsList } from '@/plugins/constants';
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
  const valueFormat = _.isNil(valueProps) ? valueProps : dayjs(valueProps, 'HH:mm:ss');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueFormat }));
  return {
    value,
    onChange(time) {
      const formatTime = _.isNil(time) ? time : time?.format('HH:mm:ss');
      _.attempt(onChangeProps, formatTime);
      onChange(value);
    },
  };
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.timePicker, className),
  };
}

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormTimePicker = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormTimePicker"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormTimePicker : BaseComponent;
  return {
    render,
  };
}

function useHandleFormWarplabel(props) {
  const { width, isForm } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const labelWidth = props.get('labelWidth');
  const labelCol = _.isNil(labelWidth) ? {} : { labelCol: { flex: `${labelWidth}px` } };
  const label = labelIsSlot ? labelProps : labelText;
  const formResult = isForm ? { width, label, ...labelCol } : {};
  return {
    [$deletePropsList]: deletePropsList,
    ...formResult,
  };
}
export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const colProps = _.pick(selfProps, COLPROPSFIELDS);
    const fieldProps = _.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS]);
    return <BaseComponent {...{ ...formItemProps, fieldProps, colProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
