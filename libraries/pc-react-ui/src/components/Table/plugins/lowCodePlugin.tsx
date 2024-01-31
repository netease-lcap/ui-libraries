import React from 'react';
import { $deletePropsList } from '@/plugins/constants';

export function useHandleNodePath(props) {
  console.log(props.toJS());
}

export function useHandleRef(props) {
  const ref = props.get('ref');
  const mutableProps = props.get('mutableProps');
  const deletePropsList = props.get($deletePropsList, []).concat(['ref']);
  const actionRef = React.useRef({});
  React.useImperativeHandle(ref, () => ({
    ...actionRef.current,
    // add: () => { console.log(1234); },
  }), [actionRef]);
  // React.useEffect(() => {
  //   console.log(actionRef, 'actionRef1234');
  // }, []);
  mutableProps.setState({ actionRef });
  return { [$deletePropsList]: deletePropsList };
}
