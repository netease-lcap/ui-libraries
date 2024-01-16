/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import _ from 'lodash';
// import type { ButtonProps } from 'antd';
// import { hookType } from '@/plugins/type';

// type ButtonImmutableProps = Map<keyof ButtonProps, ButtonProps[keyof ButtonProps]>
function HandleAsyncLoading(props) {
  const [loading, setLoading] = React.useState(false);
  const onClick = props.get('onClick');
  const deletePropsList = props.get('$deletePropsList', []);
  const $deletePropsList = _.concat(deletePropsList, ['asyncLoading']);
  const asyncLoadng = props.get('asyncLoading');
  if (!asyncLoadng || !_.isFunction(onClick)) return {};
  return {
    onClick: (...args) => {
      setLoading(true);
      Promise.resolve(onClick(...args))
        .finally(() => setLoading(false));
    },
    loading,
    $deletePropsList,
  };
}
export const handle = {
  method: HandleAsyncLoading,
  name: 'HandleAsyncLoading',
};
// const omitProps = {
// name: 'omitProps',
// deep: [],
// componentsName:[],
// methods: OmitProps,
// handle: handleOmitProps,
// order: 9,
// };
