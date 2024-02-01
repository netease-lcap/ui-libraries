import React from 'react';
import { TableProps } from 'antd';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleNodePath(props) {
  console.log(props.toJS());
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const mutableProps = props.get('mutableProps');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref', 'data-nodepath']);
  const nodePath = props.get('data-nodepath');
  const actionRef = React.useRef<TableProps['ref']>({});
  React.useImperativeHandle(ref, () => ({
    ...actionRef.current,
    add: () => { console.log(1234); },
  }), [actionRef]);
  React.useEffect(() => {
    console.log(actionRef.current.nativeElement, 'actionRef1234');
    actionRef.current.nativeElement.setAttribute('data-nodepath', nodePath);
  }, []);
  mutableProps.setState({ ref: actionRef });
  return { [$deletePropsList]: deletePropsList };
}
