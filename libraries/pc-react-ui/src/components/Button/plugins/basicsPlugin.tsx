/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import isFunction from 'lodash/isFunction';
import zipObject from 'lodash/zipObject';

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
  if (!asyncLoadng || !isFunction(onClick)) return {};
  return {
    onClick: (...args) => {
      setLoading(true);
      Promise.resolve(onClick(...args))
        .finally(() => setLoading(false));
    },
    loading,
  };
}

export function handleOmitProps(props) {
  const omitProps = zipObject(Object.keys(props.get(MAPPROPS)), []);
  return {
    asyncLoading: undefined,
    [MAPPROPS]: undefined,
    ...omitProps,
  };
}
