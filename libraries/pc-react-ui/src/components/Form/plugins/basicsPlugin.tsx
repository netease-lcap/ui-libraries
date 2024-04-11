// import fp from 'lodash/fp';
import React from 'react';
import _ from 'lodash';
import { Form } from 'antd';
import FormContext from '../form-context';

export function useHandleContext(props, refs) {
  const BaseComponents = props.get('render');
  const render = React.useCallback(React.forwardRef((localProps: any, ref) => {
    const colSpan = localProps.span;
    const { width = 'md' } = localProps;
    const value = React.useMemo(() => ({
      colSpan, isForm: true, width, labelText: '表单项名称', form: refs,
    }), [colSpan, width, refs]);
    return (
      <FormContext.Provider value={value}>
        <BaseComponents {...localProps} formRef={ref}>{localProps.children}</BaseComponents>
      </FormContext.Provider>
    );
  }), [BaseComponents, refs]);
  return {
    render,
  };
}

export function useHandleRef(props, refs) {
  const ref = props.get('ref');
  const validate = async () => refs?.current?.validateFields().then(() => true, () => false);
  const getvalues = () => {
    const value = _.mapValues(refs?.current?.getFieldsValue(), (valueItem) => valueItem ?? null);
    const formValue = refs?.current?.getFieldsFormatValue(true);
    return _.defaults(formValue, value);
  };

  return {
    ref: _.assign(ref, {
      validate,
      getValues: getvalues,
      getValue: (...arg) => {
        console.log(arg, 'arg');
        const value = refs?.current?.getFieldValue(...arg);
        console.log(value, 'value');
        return value;
      },
      setValue: (...arg) => {
        refs?.current?.setFieldValue(...arg);
      },
      setValues: (...arg) => { refs?.current?.setFieldsValue(...arg); },
      resetForm: () => refs?.current?.resetFields,
    }),
    grid: true,
  };
}
export function useHandleGutter(props) {
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
