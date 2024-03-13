import _ from 'lodash';
import fp from 'lodash/fp';
import { useControllableValue } from 'ahooks';
import React from 'react';
import { TreeNode } from '@/index';
import {
  useRequestDataSource, useHandleMapField, useFormatDataSource, useDataSourceToTree,
} from '@/plugins/common/dataSource';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleValue(props) {
  const valueProps = props.get('value');
  const onChangeProps = props.get('onChange');
  const refProps = props.get('ref');
  const [value, onChange] = useControllableValue(_.filterUnderfinedValue({ value: valueProps, onChange: onChangeProps }));
  const ref = _.assign(refProps, { value });
  return {
    value,
    onChange,
    ref,
  };
}
useHandleValue.order = 1;

function useHandleTreeNode(props) {
  const childrenProps = props.get('children');
  const childrenList = React.Children.toArray(childrenProps).filter(React.isValidElement);
  const children = _.isEmpty(childrenList) ? false : childrenList;
  const columns = props.get('treeData');
  const result = React.useMemo(() => {
    const columnsChildren = fp.filter((item: Record<string, any>) => {
      return React.isValidElement(item) && item.type === TreeNode;
    });
    const omitColumnsProps = fp.map((item: Record<string, any>) => item.props);
    const childrenFlow = fp.flow(columnsChildren, omitColumnsProps);
    // const warpColumns = fp.map((item: any) => {
    //   const { render } = item;
    //   return _.isFunction(render) ? _.assign({}, item, {
    //     render: (text, record, index) => _.attempt(render, { item: record, text, index }),
    //   }) : item;
    // });
    const columnsCond = fp.cond([
      [fp.conforms({ columns: fp.isArray, children: fp.stubTrue }), fp.constant({ treeData: columns })],
      [fp.conforms({ children: fp.isArray }), fp.constant({ columns: childrenFlow(children as Array<any>) })],
      [fp.stubTrue, fp.stubObject],
    ]);
    return columnsCond({ columns, children });
  }, [children, columns]);
  return result;
}
export function useHandleDataSource(props) {
  const dataSourceProps = props.get('dataSource');
  const textField = props.get('textField', 'label');
  const valueField = props.get('valueField', 'value');
  const parentField = props.get('parentField');
  const childrenField = props.get('childrenField');
  const onSuccess = props.get('onLoad');
  const deletePropsList = props.get($deletePropsList, []).concat(['textField', 'valueField', 'dataSource', 'parentField', 'childrenField']);
  const ref = props.get('ref');
  const { data, run: reload, loading } = useRequestDataSource(dataSourceProps, { onSuccess });
  const dataSourceFormat = useFormatDataSource(data);
  const dataSource = useHandleMapField({
    textField, valueField, dataSource: dataSourceFormat, label: 'title', value: 'key',
  });
  const TreeData = useDataSourceToTree(dataSource, parentField, valueField);
  const selfRef = React.useMemo(() => _.assign(ref, { reload, data: TreeData }), [TreeData, reload, ref]);
  const dataSourceResult = _.isEmpty(dataSource) ? {} : { treeData: TreeData };
  return {
    [$deletePropsList]: deletePropsList,
    ref: selfRef,
    baseNoRef: true,
    loading,
    ...dataSourceResult,
    fieldNames: {
      children: childrenField,
    },
  };
}
