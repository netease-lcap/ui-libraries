import { createStore } from 'zustand/vanilla';
import _ from 'lodash';
import { vi } from 'vitest';
import { Map as imMap } from 'immutable';
import * as Vue from 'vue';

import { fiberNode } from '../../src/plugins/hooks';
import '@/utils/index';

import { $deletePropsList, $tagName, $mergeRef } from '../../src/plugins/constants';

function withResolvers() {
  let resolve!: (value: any) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
  });
  return { promise, resolve };
}
export const renderHook = (
  hook,
  props,
): { currentValue: { value: any & Record<string, any> }; waitForNextUpdate: () => Promise<void> } => {
  vi.clearAllMocks();
  vi.mock('vue', async (importOriginal) => {
    const actual = (await importOriginal()) as object;
    return {
      ...actual,
      ref: vi.fn((value) => ({ value })),
      watch: vi.fn(),
      onMounted: vi.fn((fn) => fn()),
      onUnmounted: vi.fn(),
      nextTick: vi.fn(() => Promise.resolve()),
      getCurrentInstance: vi.fn(),
    };
  });

  Vue.getCurrentInstance.mockImplementation(() => ({
    vnode: {
      props,
    },
  }));
  let { promise, resolve } = withResolvers();
  const currentValue = { value: {} };
  const waitForNextUpdate = async () => {
    await promise;
  };
  const useStore = createStore((set) => ({
    state: {
      ...props,
      [$deletePropsList]: ['provide', 'inject', 'render', 'slots', 'emit', $mergeRef, $tagName],
      inject: {},
      provide: {},
      ref: {},
      emit: vi.fn(),
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
