// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import FormContext from '../form-context';

export function useHandleContext(props) {
  const BaseComponents = props.get('render');
  const render = React.useCallback((localProps) => {
    const colSpan = localProps.span;
    const { width = 'md' } = localProps;
    return (
      <FormContext.Provider value={{
        colSpan, isForm: true, width, labelText: '表单项名称',
      }}
      >
        <BaseComponents {...localProps}>{localProps.children}</BaseComponents>
      </FormContext.Provider>
    );
  }, [BaseComponents]);
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
    // grid: true,
  };
}
function useHandleGutter(props) {
  const gutterJustify = props.get('gutterJustify', 0);
  const gutterAlign = props.get('gutterAlign', 0);
  const wrapperColSpan = props.get('wrapperColSpan');
  const labelWidth = props.get('labelWidth');
  return {
    rowProps: {
      gutter: [gutterJustify, gutterAlign],
    },
    labelCol: { flex: `${labelWidth}px` },
    wrapperCol: { span: wrapperColSpan },
  };
}
