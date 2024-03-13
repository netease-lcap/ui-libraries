import React from 'react';
import _ from 'lodash';

export function useHandleNodePath(props) {
  const nodeId = React.useMemo(() => _.uniqueId('input_'), []);
  const nodePath = props.get('data-nodepath');
  const prefix = props.get('prefix');
  const suffix = props.get('suffix');
  const allowClear = props.get('allowClear');
  React.useEffect(() => {
    const inputElement = document.querySelector(`[data-node-id=${nodeId}]`);
    const inputParent = inputElement?.closest('.ant-input-affix-wrapper');
    if (inputParent) {
      inputParent?.setAttribute('data-nodepath', nodePath);
    }
  }, [allowClear, suffix, prefix]);
  return {
    'data-node-id': nodeId,
  };
}
