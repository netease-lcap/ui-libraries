// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import { Row } from '@/index';

export function useHandle(props) {
  const Compoent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const rowProps = ['gutter', 'align', 'justify', 'wrap'];
    return (
      <Compoent key="component" {..._.omit(selfProps, rowProps)}>
        <Row key="row" {..._.pick(selfProps, rowProps)}>{selfProps.children}</Row>
      </Compoent>
    );
  }, [Compoent]);
  return {
    render,
  };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const [myForm] = Form.useForm();
  const form = props.get('form', myForm);
  const onChange = props.get('onChange', () => { });
  const formValue = Form.useWatch((value) => value, form);
  React.useEffect(() => onChange(formValue), [formValue, onChange]);
  const validate = async () => form.validateFields().then(() => true, () => false);
  return {
    form,
    ref: _.assign(ref, { validate, getValues: form.getFieldsValue, setValue: Form.useWatch }),
  };
}
