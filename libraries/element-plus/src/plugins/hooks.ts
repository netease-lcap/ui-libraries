import _, { result } from 'lodash';
import { onMounted, onUnmounted } from 'vue';

interface Hook {
  next: Hook;
  storeKey: symbol;
}

interface EffectHook {
  next: EffectHook;
  dep: any[];
  result: any;
}

interface Fiber {
  workInProgressState: Hook;
  workInProgressEffect: EffectHook;
  updateQueen: any[];
  useStore: (selector: (store: any) => any) => any;
  setValue: (value: any) => void;
  storeKey: string | null;
  queen: any[];
}

interface FiberNode {
  currentFiber: Fiber;
  isMount: boolean;
}

function CreateFiberNode() {
  const workInProgressState: Hook = {
    next: null,
    storeKey: Symbol('storeKey'),
  } as unknown as Hook;
  const workInProgressEffect: EffectHook = {
    next: null,
    dep: [],
    result: null,
  } as unknown as EffectHook;

  // 设置自引用
  workInProgressState.next = workInProgressState;

  const fiberNode: FiberNode = {
    currentFiber: {
      workInProgressState,
      workInProgressEffect,
      updateQueen: [],
      useStore: (selector: (store: any) => any) => selector,
      setValue: (value: any) => value,
      storeKey: null,
      queen: [],
    },
    isMount: false,
  };
  return {
    setCurrentFiber: (fiber, isMount) => {
      fiberNode.currentFiber = fiber;
      fiberNode.isMount = isMount;
    },
    getCurrentFiber: () => fiberNode.currentFiber,
    getIsMount: () => fiberNode.isMount,
  };
}
export const fiberNode = CreateFiberNode();

export function useState(initialstate) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();

  let hook;
  if (isMount) {
    hook = {
      next: null,
      storeKey: Symbol('storeKey'),
    };
    hook.next = hook;
    if (currentFiber.workInProgressState) {
      hook.next = currentFiber.workInProgressState.next;
      currentFiber.workInProgressState.next = hook;
    }
    currentFiber.workInProgressState = hook;
  } else {
    hook = currentFiber.workInProgressState.next;
    currentFiber.workInProgressState = currentFiber.workInProgressState.next;
  }
  const state = currentFiber.useStore((store) => store.state[hook?.storeKey] ?? initialstate);
  const localSetValue = (value) => {
    const state = currentFiber.useStore((store) => store.state[hook?.storeKey] ?? initialstate);
    if (_.isEqual(value, state.value)) {
      return;
    }
    //  TODO:哪里用了 check 优化一下
    if (_.isFunction(value)) {
      value = value(state);
    }
    currentFiber.updateQueen.push({ [hook.storeKey]: value });
    _.defer(() => {
      if (!_.isEmpty(currentFiber.updateQueen)) {
        const comit = currentFiber.updateQueen.reduce((pre, cur) => ({ ...pre, ...cur }), {});
        currentFiber.setValue(comit);
        currentFiber.updateQueen.splice(0, currentFiber.updateQueen.length);
      }
    }, currentFiber.updateQueen);
  };
  return [state?.value ?? state, localSetValue];
}
export function useRef(initialstate) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook;
  if (isMount) {
    hook = {
      next: null,
      value: { current: initialstate },
    };
    hook.next = hook;
    if (currentFiber.workInProgressState) {
      hook.next = currentFiber.workInProgressState.next;
      currentFiber.workInProgressState.next = hook;
    }
    currentFiber.workInProgressState = hook;
  } else {
    hook = currentFiber.workInProgressState.next;
    currentFiber.workInProgressState = currentFiber.workInProgressState.next;
  }
  return hook.value;
}
export function useEffect(callBack, dep) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook;
  if (isMount) {
    hook = {
      next: null,
      dep,
      result: () => {},
      callBack,
    };
    hook.next = hook;
    if (currentFiber.workInProgressEffect) {
      hook.next = currentFiber.workInProgressEffect.next;
      currentFiber.workInProgressEffect.next = hook;
    }
    currentFiber.workInProgressEffect = hook;
    if (dep.length === 0) {
      onMounted(() => {
        const result = callBack(...dep);
        hook.result = _.isFunction(result) ? result : () => {};
      });
    } else {
      const result = callBack(...dep);
      hook.result = _.isFunction(result) ? result : () => {};
    }
    onUnmounted(() => {
      _.attempt(hook.result);
    });
  } else {
    hook = currentFiber.workInProgressEffect.next;
    currentFiber.workInProgressEffect = currentFiber.workInProgressEffect.next;
    const isSameDep = _.every(dep, (item, index) => Object.is(item, _.get(hook, `dep.${index}`)));
    if (!_.isEmpty(dep) && !isSameDep) {
      const result = callBack(...dep);
      hook.result = _.isFunction(result) ? result : () => {};
      hook.dep = dep;
    }
  }
  return null;
}

export function useMemo(callBack, dep) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook;
  if (isMount) {
    hook = {
      next: null,
      dep,
      result: null,
    };
    hook.next = hook;
    if (currentFiber.workInProgressEffect) {
      hook.next = currentFiber.workInProgressEffect.next;
      currentFiber.workInProgressEffect.next = hook;
    }
    currentFiber.workInProgressEffect = hook;
    hook.result = callBack();
  } else {
    hook = currentFiber.workInProgressEffect.next;
    currentFiber.workInProgressEffect = currentFiber.workInProgressEffect.next;
    const isSameDep = _.every(dep, (item, index) => Object.is(item, _.get(hook, `dep.${index}`)));
    if (!_.isEmpty(dep) && !isSameDep) {
      hook.result = callBack();
      hook.dep = dep;
    }
  }
  return hook.result;
}
export function useCallback(callBack, dep) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook;
  if (isMount) {
    hook = {
      next: null,
      dep,
      callBack,
    };
    hook.next = hook;
    if (currentFiber.workInProgressEffect) {
      hook.next = currentFiber.workInProgressEffect.next;
      currentFiber.workInProgressEffect.next = hook;
    }
    currentFiber.workInProgressEffect = hook;
    hook.callBack = callBack;
  } else {
    hook = currentFiber.workInProgressEffect.next;
    currentFiber.workInProgressEffect = currentFiber.workInProgressEffect.next;
    const isSameDep = _.every(dep, (item, index) => Object.is(item, _.get(hook, `dep.${index}`)));
    if (!_.isEmpty(dep) && !isSameDep) {
      hook.dep = dep;
      hook.callBack = callBack;
    }
  }
  return hook.callBack;
}
