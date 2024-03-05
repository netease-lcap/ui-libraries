// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import { Row } from '@/index';

export function useHandle(props) {
  return {
    render(selfProps) {
      const Compoent = props.get('render');
      const rowProps = ['gutter', 'align', 'justify', 'wrap'];
      return (
        <Compoent key="component" {..._.omit(selfProps, rowProps)}>
          <Row key="row" {..._.pick(selfProps, rowProps)}>{selfProps.children}</Row>
        </Compoent>
      );
    },
  };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const [myForm] = Form.useForm();
  const form = props.get('form', myForm);
  const add = Form.useWatch('username', form);
  console.log(add, 'add');
  const validate = async () => form.validateFields().then(() => true, () => false);
  return {
    form,
    ref: _.assign(ref, { validate, getValue: form.getFieldsValue }),
  };
}
