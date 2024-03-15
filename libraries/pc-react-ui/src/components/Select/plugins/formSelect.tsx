import React from 'react';
import { Select, Col, FormItem } from '@/index';

export function useHandleFormItem(props) {
  const Compoent = props.get('render');

  const render = React.useCallback((selfProps) => {
    return (
      <div>123</div>
      // <Col span={24}>
      //   <FormItem>
      //     <Select {...selfProps} />
      //   </FormItem>
      // </Col>
    );
  }, []);
  return {
    render,
  };
}
