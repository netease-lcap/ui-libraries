import { createStore } from 'zustand/vanilla';
import _ from 'lodash';
import { vi } from 'vitest';
import { Map as imMap } from 'immutable';
import { fiberNode } from '@/plugins/hooks';
import '@/utils/index';

import { $deletePropsList, $provide, $tagName, $mergeRef } from '@/plugins/constants';

function withResolvers() {
  let resolve!: (value: any) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
  });
  return { promise, resolve };
}
export const renderHook = (hook, props) => {
  vi.clearAllMocks();
  vi.mock('vue', () => ({
    ref: vi.fn((val) => ({ value: val })),
    onMounted: vi.fn((fn) => fn()),
    onUnmounted: vi.fn((fn) => fn()),
    nextTick: vi.fn((fn) => fn()),
    getCurrentInstance: vi.fn(() => ({
      vnode: {
        props,
      },
    })),
  }));

  let { promise, resolve } = withResolvers();
  const currentValue = { value: {} };
  const waitForNextUpdate = async () => {
    await promise;
  };
  const useStore = createStore((set) => ({
    state: {
      ...props,
      [$deletePropsList]: ['provide', 'inject', 'render', 'slots', 'emit', $deletePropsList, $mergeRef, $tagName],
      inject: {},
      provide: {},
      ref: {},
      router: vi.fn(),
      route: vi.fn(),
      [$mergeRef]: vi.fn(),
      [$tagName]: 'test',
    },
    setValue: (commit, tr) => {
      const getNewStateFn = _.cond([
        [_.isFunction, _.identity],
        [_.isPlainObject, (state) => (store) => ({ state: { ...store.state, ...state } })],
        [_.stubTrue, _.constant],
      ])(commit) as any;
      return set((state) => getNewStateFn(state), tr);
    },
  }));
  const { getState, subscribe } = useStore;
  const { setValue, state } = getState() as any;
  const fiber = {
    workInProgressState: null,
    workInProgressEffect: null,
    updateQueen: new Set(),
    getState,
    setValue,
    storeKey: _.uniqueId('storeKey'),
    queen: [],
  };
  const isMount = true;
  fiberNode.setCurrentFiber(fiber, isMount);
  const result = _.attempt(_.bind(hook.handle, _.assign(fiber, {})), imMap(_.assign(state, props)));
  currentValue.value = result as Record<string, any>;
  fiberNode.setCurrentFiber(fiber, false);
  subscribe((subProps: any) => {
    currentValue.value = _.attempt(
      _.bind(hook.handle, _.assign(fiber, {})),
      imMap(Object.assign(subProps.state, props)),
    ) as any;
    resolve(true);
    const result = withResolvers();
    promise = result.promise;
    resolve = result.resolve;
  });
  return { currentValue, waitForNextUpdate };
};
