import React from 'react';
import _ from 'lodash';
import { Input } from 'antd';
import { Col, FormItem } from '@/index';

export function useHandleFormItem(props) {
  const BaseComponent = props.get('render');
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
          <BaseComponent {..._.omit(selfProps, [...formItemPropsName, ...colPropsName, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  return {
    render,
  };
}
