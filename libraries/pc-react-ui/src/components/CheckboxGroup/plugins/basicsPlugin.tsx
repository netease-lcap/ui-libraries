import _ from 'lodash';
import React from 'react';

export function useHandleRemoveRef(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback((selfProps) => {
    return <BaseComponent {..._.omit(selfProps, 'ref')}>{selfProps.children}</BaseComponent>;
  }, [BaseComponent]);
  return {
    render,
  };
}
