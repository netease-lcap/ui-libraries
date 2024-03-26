/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import { useControllableValue } from 'ahooks';
import React from 'react';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';
import FormContext from '@/components/Form/form-context';
import { Col, FormItem, Radio } from '@/index';
import { FORMITEMPROPSFIELDS } from '@/components/Form/constants';
import { COLPROPSFIELDS } from '@/components/Row/constants';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource,
} from '@/plugins/common/dataSource';

export function useHandleValue(props) {
  const onChangeProps = props.get('onChange');
  return {
    onChange: _.wrap(onChangeProps, (fn, e: React.ChangeEvent<HTMLInputElement>) => {
      _.attempt(fn, e?.target?.value, e);
    }),
  };
}
function useHandleChildren(props) {
  const childrenProps = props.get('children');
  const dataSourceProps = props.get('dataSource');
  const dataSource = React.useMemo(() => React.Children.map(childrenProps, (item) => {
    if (item.type === Radio) {
      return item.props;
    }
    return null;
  })?.filter(Boolean), [childrenProps]);
  return { dataSource: dataSourceProps ?? dataSource, children: null };
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const defaultValue = props.get('defaultValue');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps, defaultValue }));
  return {
    value,
    onChange,
    ref: _.assign(ref, { value, setValue: onChange }),
  };
}
useHandleRef.order = 1;

export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const childrenField = props.get('childrenField');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps);
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({ textField, valueField, dataSource: dataSourceFormat });
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: dataSource }), [dataSource, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { options: dataSource };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
    fieldNames: {
      children: childrenField,
    },
  };
}

function useHandleFormWarp(props) {
  const { isForm } = React.useContext(FormContext);
  const BaseComponent = props.get('render');
  const FormRadioGroup = React.useCallback((selfProps) => {
    const nodepath = selfProps['data-nodepath'];
    return (
      <Col
        span={24}
        {..._.pick(selfProps, COLPROPSFIELDS)}
        data-nodepath={nodepath}
        data-tag-name="FormRadioGroup"
        data-has-mutation="true"
      >
        <FormItem {..._.pick(selfProps, FORMITEMPROPSFIELDS)}>
          <BaseComponent {..._.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS, 'data-nodepath', 'children'])} />
        </FormItem>
      </Col>
    );
  }, [BaseComponent]);
  const render = isForm ? FormRadioGroup : BaseComponent;
  return {
    render,
  };
}

function useHandleFormWarplabel(props) {
  const { width, isForm } = React.useContext(FormContext);
  const deletePropsList = props.get($deletePropsList).concat('labelIsSlot', 'labelText');
  const labelIsSlot = props.get('labelIsSlot');
  const labelProps = props.get('label');
  const labelText = props.get('labelText');
  const labelWidth = props.get('labelWidth');
  const labelCol = _.isNil(labelWidth) ? {} : { labelCol: { flex: `${labelWidth}px` } };
  const label = labelIsSlot ? labelProps : labelText;
  const formResult = isForm ? { width, label, ...labelCol } : {};
  return {
    [$deletePropsList]: deletePropsList,
    ...formResult,
  };
}
export function useHandleFormItemProps(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    const formItemProps = _.pick(selfProps, FORMITEMPROPSFIELDS);
    const colProps = _.pick(selfProps, COLPROPSFIELDS);
    const fieldProps = _.omit(selfProps, [...FORMITEMPROPSFIELDS, ...COLPROPSFIELDS]);
    return <BaseComponent {...{ ...formItemProps, fieldProps, colProps }} />;
  }, [BaseComponent]);
  return {
    render,
  };
}
export function useHandleRemoveRef(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    return <BaseComponent {..._.omit(selfProps, 'ref')}>{selfProps.children}</BaseComponent>;
  }, [BaseComponent]);
  return {
    render,
  };
}

export * from './lowCode';

export * from '@/components/Form/plugins/formItemPlugin';
