import { createStore } from 'zustand/vanilla';
import _ from 'lodash';
import { vi } from 'vitest';
import { Map as imMap } from 'immutable';
import * as Vue from 'vue';
import { WatchableSet } from './watchbleSet';

import { fiberNode } from '../../src/plugins/hooks';
import '@/utils/index';

import { $deletePropsList, $tagName, $mergeRef, $router, $route } from '../../src/plugins/constants';

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

function withResolversWithHooks() {
  let resolve!: (value: any) => void;
  let status: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  const promise = new Promise((res, rej) => {
    resolve = () => {
      status = 'fulfilled';
      res(true);
    };
  });
  const getPromiseStatus = () => status;
  return { promise, resolve, getPromiseStatus };
}
export const renderHooks = async (
  hook,
  props,
): Promise<{
  currentValue: { value: any & Record<string, any> };
  waitForNextUpdate: () => Promise<void>;
  setValue: (value: any) => void;
}> => {
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
  let { promise, resolve, getPromiseStatus } = withResolversWithHooks();
  let { promise: updatePromise, resolve: updateResolve } = withResolversWithHooks();
  resolve(true);
  const currentValue = { value: {} };
  const waitForNextUpdate = async () => {
    await updatePromise;
  };
  const useStore = createStore((set) => ({
    state: {
      slots: {},
      // ...props,
      [$deletePropsList]: ['provide', 'inject', 'render', 'slots', 'emit', $mergeRef, $tagName],
      inject: {},
      provide: {},
      ref: {},
      emit: vi.fn(),
      [$router]: vi.fn(),
      [$route]: vi.fn(),
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
  const fiberMap = new Map<string, any>([
    ['updateQueen', new Set()],
    ['getState', getState],
  ]);
  const AllUpdateQueue = new WatchableSet([], 1);
  const scheduler = (pluginHooks, ImmutableState, ImmutableProps) => {
    const getState = fiberMap.get('getState');
    return pluginHooks?.reduce((ImmutableState, pluginHook) => {
      const handleFn = _.isFunction(pluginHook) ? pluginHook : pluginHook.handle;
      const isMount = !fiberMap.has(handleFn);
      const storeKey = _.uniqueId('storeKey');
      const fiber = isMount
        ? {
            workInProgressState: null,
            workInProgressEffect: null,
            updateQueen: AllUpdateQueue,
            getState,
            setValue,
            storeKey,
          }
        : fiberMap.get(handleFn);

      fiberNode.setCurrentFiber(fiber, isMount);
      const result = _.attempt(_.bind(handleFn, fiber), ImmutableState, ImmutableProps);
      fiberMap.set(handleFn, fiber);
      return ImmutableState.merge(result);
    }, ImmutableState);
  };
  AllUpdateQueue.watch((set) => {
    if (set.size === 0) {
      resolve(true);
    } else if (getPromiseStatus() === 'fulfilled') {
      const result = withResolversWithHooks();
      promise = result.promise;
      resolve = result.resolve;
      getPromiseStatus = result.getPromiseStatus;
    }
  });

  subscribe(({ state }: any) => {
    const pluginHooks = _.isArray(hook) ? hook : [hook];
    currentValue.value = scheduler(pluginHooks, imMap(state), imMap(props)).toJS();
    updateResolve(true);
    const result = withResolversWithHooks();
    updatePromise = result.promise;
    updateResolve = result.resolve;
  });

  setValue({ ...props });

  await promise;
  const setValuePromise = async (...arg) => {
    await new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(true);
      }, 30);
    }).then(() => promise);
    setValue(...arg);
  };
  return { currentValue, waitForNextUpdate, setValue: setValuePromise };
};
