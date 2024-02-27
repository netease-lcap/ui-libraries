import React from 'react';

export function useHandleOpenRef(props) {
  const ref = props.get('ref');
  const mutableProps = props.get('mutableProps');
  const selfRef = React.useRef({});
  React.useImperativeHandle(ref, () => ({
    ...selfRef.current,
  }), [selfRef]);
  mutableProps.setState({ ref: selfRef });
  return {};
}
