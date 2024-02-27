import React from 'react';
import { TableProps } from 'antd';
import _ from 'lodash';
import { $deletePropsList } from '@/plugins/constants';

function useHandleNodePath(props) {
  console.log(props.toJS());
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const mutableProps = props.get('mutableProps');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'data-nodepath']);
  const nodePath = props.get('data-nodepath');
  const actionRef = React.useRef<any>({});
  React.useImperativeHandle(ref, () => ({
    ...actionRef.current,
  }), [actionRef]);
  React.useEffect(() => {
    actionRef.current!.nativeElement.setAttribute('data-nodepath', nodePath);
  }, []);
  mutableProps.setState({ ref: actionRef });
  return { [$deletePropsList]: deletePropsList };
}

export function useHandleColumnsNodePath(props) {
  const children = props.get('children');
  const columns = props.get('column');
  const mutableProps = props.get('mutableProps');
  const mutableRef = mutableProps.getObj();
  React.useEffect(() => {
    if (_.isNil(mutableRef.ref)) return;
    const { ref } = mutableRef;
    const tableColumns = _.isNil(columns) ? _.map(children, (item) => item.props) : columns;
    const tableCell = ref.current?.nativeElement?.querySelectorAll('.ant-table-cell');
    _.forEach(tableColumns, (columnsProps, index) => {
      tableCell[index]?.setAttribute('data-nodepath', columnsProps['data-nodepath']);
    });
  }, [children, columns, mutableRef]);
}
