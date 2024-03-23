import React from 'react';
import _ from 'lodash';
import { Select, Col, FormItem } from '@/index';

export function useHandleFormItem(props) {
  const render = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    const formItemPropsName = ['label', 'name', 'required', 'tooltip', 'rules'];
    const colPropsName = ['span'];
    const { labelIsSlot } = selfProps;
    const label = labelIsSlot ? selfProps.abel : selfProps.labelText;
    const formItemProps = { ..._.pick(selfProps, formItemPropsName), label };
    return (
      <Col span={24} {..._.pick(selfProps, colPropsName)} data-nodepath={nodepath}>
        <FormItem {...formItemProps}>
          <Select {..._.omit(selfProps, [...formItemPropsName, ...colPropsName, 'data-nodepath'])} />
        </FormItem>
      </Col>
    );
  }, []);
  return {
    render,
  };
}
