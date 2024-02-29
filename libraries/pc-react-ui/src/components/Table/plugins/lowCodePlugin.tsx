import React from 'react';
import { TableProps } from 'antd';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleRef(props) {
  const nodeId = _.uniqueId('table_');
  const deletePropsList = props.get($deletePropsList, []).concat(['data-nodepath']);
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const myTable = document.querySelector(`[data-node-id=${nodeId}]`);
    myTable?.setAttribute('data-nodepath', nodePath);
  }, []);
  return { [$deletePropsList]: deletePropsList, 'data-node-id': nodeId };
}

// export function useHandleColumnsNodePath(props) {
//   const children = props.get('children');
//   const columns = props.get('column');
//   const mutableProps = props.get('mutableProps');
//   const mutableRef = mutableProps.getObj();
//   React.useEffect(() => {
//     if (_.isNil(mutableRef.ref)) return;
//     const { ref } = mutableRef;
//     const tableColumns = _.isNil(columns) ? _.map(children, (item) => item.props) : columns;
//     const tableCell = ref.current?.nativeElement?.querySelectorAll('.ant-table-cell');
//     _.forEach(tableColumns, (columnsProps, index) => {
//       tableCell[index]?.setAttribute('data-nodepath', columnsProps['data-nodepath']);
//     });
//   }, [children, columns, mutableRef]);
// }
