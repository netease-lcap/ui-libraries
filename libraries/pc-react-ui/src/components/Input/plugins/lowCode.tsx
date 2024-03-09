import React from 'react';
import _ from 'lodash';

export function useHandleNodePath(props) {
  const Compoent = props.get('render');
  const nodePath = props.get('data-nodepath');
  const render = React.useCallback((selfProps) => {
    return (
      <span data-nodepath={nodePath}>
        <Compoent {..._.omit(selfProps, ['data-nodepath'])}>{selfProps.children}</Compoent>
      </span>
    );
  }, [Compoent]);
  return {
    render,
  };
}
