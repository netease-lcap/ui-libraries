import React from 'react';

export function useHandleOpenRef(props) {
  const mutableProps = props.get('mutableProps');
  const ref = mutableProps.getState('ref');
  const selfRef = React.useRef({});
  React.useImperativeHandle(ref, () => ({
    ...selfRef.current,
  }), [selfRef]);
  mutableProps.setState({ ref: selfRef });
  return {};
}
