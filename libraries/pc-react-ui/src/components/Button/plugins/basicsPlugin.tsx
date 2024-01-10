/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import isFunction from 'lodash/isFunction';

const MAPPROPS = 'mapProps';

export function handleTransitionProps(props) {
  if (!props.has(MAPPROPS)) return {};
  const mapProps = props.get(MAPPROPS);
  return Object.entries(mapProps)
    .reduce((preProps, [key, value]) => preProps.set(value, preProps.get(key)), props);
}
export function HandleAsyncLoading(props) {
  const [loading, setLoading] = React.useState(false);
  const onClick = props.get('onClick');
  const asyncLoadng = props.get('asyncLoading');
  if (!asyncLoadng || isFunction(onClick)) return {};
  return {
    onClick: (...args) => {
      setLoading(true);
      Promise.resolve().then(() => onClick(...args)).finally(() => {
        setLoading(false);
      });
    },
    loading,
  };
}

export function omitProps() {
  return {
    asyncLoading: undefined,
  };
}
