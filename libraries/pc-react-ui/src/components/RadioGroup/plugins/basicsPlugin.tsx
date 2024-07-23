import React from 'react';
import _ from 'lodash';

export function useHandleRemoveRef(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback(React.forwardRef((selfProps: any, ref) => {
    return <BaseComponent {..._.omit(selfProps, 'ref')}>{selfProps.children}</BaseComponent>;
  }), [BaseComponent]);
  return {
    render,
  };
}
