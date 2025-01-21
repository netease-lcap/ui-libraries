import React from 'react';

export function useRemoteRef(props) {
  const BaseComponet = props.get('render');
  const render = React.useCallback(React.forwardRef((localProps, ref) => {
    return <BaseComponet {...localProps} />;
  }), [BaseComponet]);
  return {
    render,
  };
}
