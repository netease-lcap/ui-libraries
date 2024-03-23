// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ProFormDatePicker, QueryFilter, ProFormDateRangePicker, ProFormSelect,
} from '@ant-design/pro-components';
import {
  Row, FormSelect, Col, Select,
} from '@/index';

export function useHandle(props) {
  const Compoent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const rowProps = ['gutter', 'align', 'justify', 'wrap', 'gutterJustify', 'gutterAlign'];
    const children = React.Children.map(selfProps.children, (item) => {
      if (item.type === FormSelect) {
        return <FormSelect {...item.props} />;
      }
      return item;
    });

    return (
      <Compoent key="component" {..._.omit(selfProps, rowProps)}>
        <Row key="row" {..._.pick(selfProps, rowProps)}>{children}</Row>
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
    ref: _.assign(ref, {
      validate, getValues: form.getFieldsValue, setValue: form.setFieldValue, setValues: form.setFieldsValue,
    }),
  };
}
