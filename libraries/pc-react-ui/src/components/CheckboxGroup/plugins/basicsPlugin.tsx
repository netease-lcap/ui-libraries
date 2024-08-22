import _ from 'lodash';
import React from 'react';

export function useHandleRemoveRef(props) {
  const BaseComponent = props.get('render');
  const render = React.useCallback(React.forwardRef((selfProps: any, ref) => {
    return <BaseComponent {...selfProps}>{selfProps.children}</BaseComponent>;
  }), [BaseComponent]);
  return {
    render,
  };
}
