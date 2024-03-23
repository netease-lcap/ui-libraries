// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import FormContext from '../form-context';
import {
  Row, FormSelect,
} from '@/index';

export function useHandleContext(props) {
  const BaseComponents = props.get('render');
  const render = React.useCallback((selfProps) => {
    const colSpan = selfProps.span;
    return (
      <FormContext.Provider value={{ colSpan, isForm: true }}>
        <BaseComponents {...selfProps}>{selfProps.children}</BaseComponents>
      </FormContext.Provider>
    );
  }, [BaseComponents]);
  return {
    render,
  };
}
function useHandle(props) {
  const Compoent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const rowProps = ['gutter', 'alignment', 'justify', 'wrap', 'gutterJustify', 'gutterAlign', 'direction'];
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
  const validate = async () => form.validateFields().then(() => true, () => false);
  return {
    form,
    ref: _.assign(ref, {
      validate, getValues: form.getFieldsValue, setValue: form.setFieldValue, setValues: form.setFieldsValue,
    }),
    grid: true,
  };
}
export function useHandleGutter(props) {
  const gutterJustify = props.get('gutterJustify', 0);
  const gutterAlign = props.get('gutterAlign', 0);
  const wrapperColSpan = props.get('wrapperColSpan');
  const labelColSpan = props.get('labelColSpan');
  return {
    gutter: [gutterJustify, gutterAlign],
    labelCol: { span: labelColSpan },
    wrapperCol: { span: wrapperColSpan },

  };
}
