import React from 'react';
import _ from 'lodash';

export function useHandleRef(props) {
  const [element, setElement] = React.useState({});
  const nodeId = _.uniqueId('switch_');
  const ref = props.get('ref');
  React.useEffect(() => {
    const switchElement = document.querySelector(`[data-nodeid=${nodeId}]`);
    setElement({ switch: switchElement }!);
  }, []);
  return {
    'data-nodeid': nodeId,
    ref: _.assign(ref, element),
  };
}
