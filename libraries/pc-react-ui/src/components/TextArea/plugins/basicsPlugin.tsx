import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import style from '../index.module.less';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { $deletePropsList } from '@/plugins/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';

export function useHandleRef(props) {
  const onChangeProps = props.get('onChange');
  const result = {
    onChange: _.wrap(onChangeProps, (fn, e: React.ChangeEvent<HTMLInputElement>) => {
      fn(e?.target?.value, e);
    }),
  };
  return _.isFunction(onChangeProps) ? result : {};
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.textArea, className),
  };
}

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormTextArea = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormTextArea"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormTextArea : BaseComponent;
  return {
    render,
  };
}

export function useHandleFormWarplabel(props) {
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const label = labelIsSlot ? labelProps : labelText;
  return {
    [$deletePropsList]: deletePropsList,
    label,
  };
}
export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const fieldProps = _.omit(selfProps, FORMITEMPROPSFIELDS);
    return <BaseComponent {...{ ...formItemProps, fieldProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
