/* eslint-disable no-param-reassign */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import { Modal, Popconfirm } from 'antd';
import type { ButtonProps } from 'antd';
import type { StateMap } from '@/types/immutable';
import { $deletePropsList } from '@/plugins/constants';

// interface StateMap<T, F> extends Map<string, any> {
//   get<K extends keyof (T & F), L>(key: K, defaultValue?: L):
//     (T & F)[K] extends undefined ? L : (T & F)[K]
// }
const { confirm } = Modal;

function useHandleAsyncLoading(props: StateMap<
  ButtonProps,
  { asyncLoading: boolean, [$deletePropsList]: string[] }
>) {
  const [loading, setLoading] = React.useState(false);

  const onClick = props.get('onClick');
  const asyncLoading = props.get('asyncLoading');
  const deletePropsList = props.get($deletePropsList, []).concat(['asyncLoading']);
  const warpperOnClick = React.useCallback((fn, ...args) => {
    setLoading(true);
    return Promise.resolve(fn(...args)).finally(() => setLoading(false));
  }, [onClick]);
  const asyncLoadingResult = {
    onClick: _.wrap(onClick, warpperOnClick),
    loading,
  };
  const asyncLoadingConforms = _.conforms({
    asyncLoading: fp.isEqual(true),
    onClick: _.isFunction,
  });
  const condHandle = _.cond([
    [asyncLoadingConforms, _.constant(asyncLoadingResult)],
    [_.stubTrue, _.stubObject],
  ]);
  return _.assign({ [$deletePropsList]: deletePropsList }, condHandle({ asyncLoading, onClick }));
}

export function useHandleConfirm(props) {
  const confirmProps = props.get('confirm');
  const onClick = props.get('onClick');
  const loading = props.get('loading');
  const deletePropsList = props.get($deletePropsList, []).concat(['confirm']);
  const warpperOnClick = (fn, ...args) => {
    confirm({
      title: 'Do you Want to delete these items?',
      content: 'Some descriptions',
      okButtonProps: {
        loading,
      },
      onOk() {
        return fn(...args);
      },
    });
  };
  const confirmResult = {
    onClick: _.wrap(onClick, warpperOnClick),
  };
  const popConfirmResult = {
    render(selfProps) {
      const Compoent = props.get('render');
      const partProps = _.omit(selfProps, ['onClick']);
      return (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={selfProps.onClick}
          okText="Yes"
          cancelText="No"
        >
          <Compoent {...partProps} />
        </Popconfirm>
      );
    },
  };
  const condHandle = _.cond([
    [_.matches('modalConfirm'), _.constant(confirmResult)],
    [_.matches('popConfirm'), _.constant(popConfirmResult)],
    [_.stubTrue, _.stubObject],
  ]);
  return _.assign({ [$deletePropsList]: deletePropsList }, condHandle(confirmProps));
}
useHandleConfirm.order = 4;

export const handle = {
  method: useHandleAsyncLoading,
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
