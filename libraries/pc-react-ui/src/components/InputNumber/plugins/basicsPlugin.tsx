import numbro from 'numbro';
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import { $deletePropsList } from '@/plugins/constants';
import style from '../index.module.less';

export function Handleformat(props: any & { formatType: 'thousandths' | 'percentSign' }) {
  const formatType = props.get('formatType');
  const deletePropsList = props.get($deletePropsList, []).concat(['formatType']);
  const thousandthsResult = {
    formatter: (value) => numbro(+value).format({ thousandSeparated: true }),
    parser: (value) => numbro.unformat(value),
  };
  const percentSignResult = {
    formatter: (value) => `${value}%`,
    parser: (value) => _.replace(value, '%', ''),
  };
  const result = _.cond([
    [_.matches('thousandths'), _.constant(thousandthsResult)],
    [_.matches('percentSign'), _.constant(percentSignResult)],
    [_.stubTrue, _.stubObject],
  ]);
  return _.assign({ [$deletePropsList]: deletePropsList }, result(formatType));
}
export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.inputNumber, className),
  };
}

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormInputNumber = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormInputNumber"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(
            selfProps,
            [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'],
          )}
          />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormInputNumber : BaseComponent;
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
    const colProps = _.pick(selfProps, COLPROPSFIELDS);
    const fieldProps = _.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS]);
    return <BaseComponent {...{ ...formItemProps, fieldProps, colProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
