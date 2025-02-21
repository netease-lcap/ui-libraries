/* eslint-disable no-shadow */
import _ from 'lodash';
import { nextTick } from 'vue';
import { $deletePropsList } from '@/plugins/constants';
import {
  useRequestDataSource,
  useHandleMapField,
  useFormatDataSource,
  useDataSourceToTree,
} from '@/plugins/common/dataSource';
import {
  useState, useEffect, useMemo, useRef,
} from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export function handleDataSource(props) {
  const dataConfig = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const deletePropsList = props
    .get($deletePropsList, [])
    .concat(['textField', 'valueField', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const {
    data,
    run: reload,
    loading,
  } = useRequestDataSource(
    dataConfig,
    {},
    {
      useState,
      useEffect,
      useMemo,
      useRef,
    },
  );
  const dataSource = useHandleMapField(
    { textField, valueField, dataSource: useFormatDataSource(data, { useMemo }) },
    { useMemo },
  );
  const TreeData = useMemo(
    () => useDataSourceToTree(dataSource, parentField, valueField),
    [dataSource, parentField, valueField],
  );
  const selfRef = useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(TreeData) ? {} : { options: TreeData };

  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    loading,
    ...dataSourceResult,
  };
}
function handleValue(props, { useState }) {
  const [value, setValue] = useState('');
  const propsValue = props.get('modelValue') || value;
  const onChangeProps = props.get('onChange', () => {});
  const emit = props.get('emit');
  const changeValue = props.get('modelValue') ? _.bind(emit, 'update:modelValue') : setValue;

  return {
    onChange: _.wrap(onChangeProps, (fn, value) => {
      _.attempt(fn, value);
      changeValue(value);
    }),
    modelValue: propsValue,
  };
}

export function handleCascaderProps(props) {
  const multiple = props.get('multiple', false);
  const checkStrictly = props.get('checkStrictly', false);

  return {
    props: {
      multiple,
      checkStrictly,
    },
  };
}

export function handleNodePath(props, { useMemo, useEffect }) {
  const nodePath = props.get('data-nodepath');
  const myClass = props.get('class', '');
  const nodeId = useMemo(() => _.uniqueId('Cascader_'), []);
  useEffect(() => {
    nextTick(() => {
      const node = document.querySelector(`.${nodeId}`);
      node?.setAttribute('data-nodepath', nodePath);
    });
  }, []);
  return {
    class: `${myClass} ${nodeId}`,
    formTagName: 'el-form-cascader',
  };
}
