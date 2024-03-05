import React from 'react';
import _ from 'lodash';

export function useHandleNodepath(props) {
  const nodepath = props.get('data-nodepath');
  const nodeid = _.uniqueId('inputNumber_');
  React.useEffect(() => {
    const inputNumber = document.querySelector(`[data-node-id=${nodeid}]`)?.closest('.ant-input-number');
    if (!inputNumber) return;
    inputNumber?.setAttribute('data-nodepath', nodepath);
  }, [nodepath]);
  return {
    'data-node-id': nodeid,
  };
}
