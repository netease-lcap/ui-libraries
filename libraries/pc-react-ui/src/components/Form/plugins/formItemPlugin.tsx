// import fp from 'lodash/fp';
import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import VusionValidator, { localizeRules } from '@vusion/validator';
import FormContext from '../form-context';

import style from '../index.module.less';
import {
  Col,
} from '@/index';
// import { $deletePropsList } from '@/plugins/constants';

export function useHandleStyle(props) {
  const className = props.get('className');
  return {
    className: classnames(style.formItem, className),
  };
}
export function useHandleCol(props) {
  const Compoent = props.get('render');
  const { colSpan } = React.useContext(FormContext);
  const render = React.useCallback((selfProps) => {
    const ColPorps = ['offset', 'span'];
    const span = _.assign({ span: 24 }, _.filterUnderfinedValue({ span: colSpan }), _.filterUnderfinedValue({ span: selfProps.span }));
    return (
      <Col {..._.pick(selfProps, ColPorps)} {...span}>
        <Compoent {...selfProps}>{selfProps.children}</Compoent>
      </Col>
    );
  }, [Compoent]);
  return {
    render,
  };
}
export function useHandleRule(props) {
  const rules = props.get('rules');
  return {

    rules: _.map(rules, (item) => {
      return {
        message: item.message,
        required: item.required,
        validateTrigger: ['onChange', 'onBlur'],
        ...item,
        validator: (rule, value) => {
          const validator = new VusionValidator(undefined, localizeRules, [rule]);
          return validator.validate(value);
        },
      };
    }),

  };
}
