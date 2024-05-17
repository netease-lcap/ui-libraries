import React from 'react';
import _ from 'lodash';

export function useHandleRef(props) {
  const [element, setElement] = React.useState({});
  const nodeId = _.uniqueId('button_');
  const ref = props.get('ref');
  React.useEffect(() => {
    const buttonElement = document.querySelector(`[data-nodeid=${nodeId}]`);
    setElement({ button: buttonElement }!);
  }, []);
  return {
    'data-nodeid': nodeId,
    ref: _.assign(ref, element),
  };
}
