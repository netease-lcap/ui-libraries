import React from 'react';
import _ from 'lodash';
import { Col, FormItem } from '@/index';
import FormContext from '@/components/Form/form-context';

export function useHandleFormItem(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    const formItemPropsName = ['label', 'name', 'required', 'tooltip', 'rules'];
    const colPropsName = ['span'];
    const { labelIsSlot } = selfProps;
    const label = labelIsSlot ? selfProps.label : selfProps.labelText;
    const formItemProps = { ..._.pick(selfProps, formItemPropsName), label };
    return (
      <Col {..._.pick(selfProps, colPropsName)} data-nodepath={nodepath} data-tag-name="FormInput">
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
