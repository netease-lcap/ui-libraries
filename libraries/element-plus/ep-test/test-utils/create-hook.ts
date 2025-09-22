import { createStore } from 'zustand/vanilla';
import _ from 'lodash';
import { vi } from 'vitest';
import { Map as imMap } from 'immutable';
import { fiberNode } from '../../src/plugins/hooks';
import '@/utils/index';

function withResolvers() {
  let resolve!: (value: any) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
  });
  return { promise, resolve };
}
export const createHook = (hook, props) => {
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
  const { setValue } = getState() as any;
  const fiber = {
    workInProgressState: null,
    workInProgressEffect: null,
    updateQueen: new Set(),
    getState: () => ({}),
    setValue,
    storeKey: null,
    queen: [],
  };
  const isMount = true;
  fiberNode.setCurrentFiber(fiber, isMount);
  const result = _.attempt(_.bind(hook, _.assign(fiber, {})), imMap(props));
  fiberNode.setCurrentFiber(fiberNode.getCurrentFiber(), false);
  currentValue.value = result;
  subscribe((props: any) => {
    resolve(true);
    currentValue.value = _.attempt(_.bind(hook, _.assign(fiber, {})), imMap(props.state)) as any;
    const result = withResolvers();
    promise = result.promise;
    resolve = result.resolve;
  });
  return { currentValue, waitForNextUpdate };
};
