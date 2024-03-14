// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import VusionValidator, { localizeRules } from '@vusion/validator';
// import { ErrorBoundary } from 'react-error-boundary';
import { Col, Select, Input } from '@/index';
// import { $deletePropsList } from '@/plugins/constants';

export function useHandleCol(props) {
  const Compoent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const ColPorps = ['offset', 'span'];
    // if (selfProps.children.type === Select) {
    //   const nodepath = selfProps['data-nodepath'];
    //   console.log(nodepath, 'selfAttempt');
    //   return (
    //     <Input data-nodepath={nodepath} />
    //   );
    // }
    return (
      <Col span={24} {..._.pick(selfProps, ColPorps)}>
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
