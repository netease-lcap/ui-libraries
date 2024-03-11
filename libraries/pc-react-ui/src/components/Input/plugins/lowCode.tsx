import React from 'react';
import _ from 'lodash';

export function useHandleNodePath(props) {
  const nodeId = React.useMemo(() => _.uniqueId('input_'), []);
  const nodePath = props.get('data-nodepath');
  React.useEffect(() => {
    const inputElement = document.querySelector(`[data-node-id=${nodeId}]`);
    const inputParent = inputElement?.closest('.ant-input-affix-wrapper');
    console.log(inputParent, 'input_');
    if (inputParent) {
      inputParent?.setAttribute('data-nodepath', nodePath);
    }
  }, []);
  return {
    'data-node-id': nodeId,
  };
}
