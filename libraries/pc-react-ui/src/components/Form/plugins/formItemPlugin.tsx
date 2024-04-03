import React from 'react';
import _ from 'lodash';
import VusionValidator, { localizeRules } from '@vusion/validator';
import FormContext from '../form-context';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleRule(props) {
  const rules = props.get('rules');
  return {
    rules: _.map(rules, (item) => {
      return {
        message: item.message,
        required: item.required,
        validateTrigger: ['onChange', 'onBlur'],
        ...item,
        validator: (rule, value) => {
          const validator = new VusionValidator(undefined, localizeRules, [rule]);
          return validator.validate(value);
        },
      };
    }),

  };
}
export function useHandleDefaultValue(props) {
  const { form } = React.useContext(FormContext);
  React.useEffect(() => {
    const name = props.get('name');
    const defaultValue = props.get('defaultValue');
    form.setFieldValue(name, defaultValue);
  }, []);
}
export function useHandleFormWarplabel(props) {
  const { width: widthContext, isForm, colSpan } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const labelWidth = props.get('labelWidth');
  const widthProps = props.get('width');
  const spanProps = props.get('span');
  const labelCol = _.isNil(labelWidth) ? {} : { labelCol: { flex: `${labelWidth}px` } };
  const label = labelIsSlot ? labelProps : labelText;
  const span = _.defaults({ span: spanProps }, { span: colSpan });
  const width = _.defaults({ width: widthProps }, { width: widthContext });
  const formResult = isForm ? {
    label, ...labelCol, ...span, ...width,
  } : {};
  return {
    [$deletePropsList]: deletePropsList,
    ...formResult,
  };
}
