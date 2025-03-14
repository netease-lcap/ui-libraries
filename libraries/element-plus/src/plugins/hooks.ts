import _ from 'lodash';
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';
import { PluginBase } from '@/types';

interface Hook {
  next: Hook;
  storeKey: symbol;
}

interface EffectHook {
  next: EffectHook;
  dep: any[];
  result: any;
}

interface Options {
  defaultValue?: string;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
  onChange?: (value: any) => void;
}
interface Fiber {
  workInProgressState: Hook;
  workInProgressEffect: EffectHook;
  updateQueen: Set<any>;
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
      updateQueen: new Set(),
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

export function useState(initialstate?) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();

  let hook;
  if (isMount) {
    hook = {
      next: null,
      storeKey: Symbol('storeKey'),
      isSetValue: false,
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
  const state = hook?.isSetValue ? currentFiber.useStore((store) => store.state[hook?.storeKey]) : { value: initialstate };
  const localSetValue = (value) => {
    hook.isSetValue = true;
    const state = currentFiber.useStore((store) => store.state[hook?.storeKey]);
    if (_.isEqual(value, state.value)) {
      return;
    }
    //  TODO:表单临时hack用了 后期优化一下
    if (_.isFunction(value)) {
      value = value(state);
    }
    currentFiber.updateQueen.add({ [hook.storeKey]: value });
    _.defer(() => {
      if (currentFiber.updateQueen.size) {
        const comit = Array.from(currentFiber.updateQueen).reduce((pre, cur) => ({ ...pre, ...cur }), {});
        currentFiber.setValue(comit);
        currentFiber.updateQueen.clear();
      }
    }, currentFiber.updateQueen);
  };
  return [state.value, localSetValue];
}
export function useRef(initialstate) {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook;
  if (isMount) {
    hook = {
      next: null,
      // value: { current: initialstate },
      value: ref(initialstate),
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
    // if (dep.length === 0) {
    onMounted(() => {
      const result = callBack(...dep);
      hook.result = _.isFunction(result) ? result : () => {};
    });
    // } else {
    //   const result = callBack(...dep);
    //   hook.result = _.isFunction(result) ? result : () => {};
    // }
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

export function useControllableValue(props: any, options: Options = {}) {
  const instance = useMemo(() => getCurrentInstance(), []);
  const { vnode } = instance;
  const emit = props.get('emit');
  const vProps = vnode.props || {};
  const {
    defaultValue = '',
    defaultValuePropName = 'defaultValue',
    valuePropName = 'modelValue',
    trigger = `onUpdate:${valuePropName}`,
    onChange: onChangeProps = () => {},
  } = options || {};
  const isControlled = Object.prototype.hasOwnProperty.call(vProps, valuePropName);
  const propsValue = props.get(valuePropName);
  const defaultValueValue = props.get(defaultValuePropName);
  const [stateValue, setStateValue] = useState(propsValue ?? defaultValueValue ?? defaultValue);
  const valueChange = props.get(trigger, () => {});

  const onChange = (value: any) => {
    _.attempt(onChangeProps, value);
    if (isControlled) {
      emit(trigger, value);
    } else {
      setStateValue(value);
    }
    _.attempt(valueChange, value);
  };
  const value = useMemo(() => (isControlled ? propsValue : stateValue), [stateValue, isControlled]);

  return [
    value,
    onChange,
    {
      [valuePropName]: value,
      [trigger]: onChange,
    },
  ];
}

export function scheduler(pluginHooks, ImmutableProps, fiberMap) {
  const updateQueen = fiberMap.get('updateQueen');
  const useStore = fiberMap.get('useStore');
  const setValue = useStore((state: any) => state.setvalue);
  return pluginHooks?.reduce((ImmutableProps, handleFn) => {
    const isMount = !fiberMap.has(handleFn);
    const storeKey = _.uniqueId('storeKey');
    const fiber = isMount
      ? {
          workInProgressState: null,
          workInProgressEffect: null,
          updateQueen,
          useStore,
          setValue,
          storeKey,
        }
      : fiberMap.get(handleFn);
    fiberNode.setCurrentFiber(fiber, isMount);
    const result = _.attempt(_.bind(handleFn, fiber), ImmutableProps);
    fiberMap.set(handleFn, fiber);
    return ImmutableProps.merge(result);
  }, ImmutableProps);
}

// 合并类型数组中的所有类型
type MergeTypes<T extends any[]> = T extends [infer First, ...infer Rest] ? First & MergeTypes<Rest> : object;

// 定义主类型，接受一个可选的泛型数组
type AccumulateTypes<T extends any[] = []> = {
  // 添加新类型的方法
  add<U>(): AccumulateTypes<[...T, U]>;
  // 获取当前累积的所有类型，返回准确的类型映射
  getMapTypes(): {
    get<K extends keyof MergeTypes<T>>(key: K): MergeTypes<T>[K];
  } & Map<keyof MergeTypes<T>, MergeTypes<T>[keyof MergeTypes<T>]>;
  getTypes(): MergeTypes<T>;
};

// 创建 AccumulateTypes 实例的辅助函数
export function createAccumulateTypes<T extends any[] = []>(): AccumulateTypes<T> {
  return {
    add<U>(): AccumulateTypes<[...T, U]> {
      return createAccumulateTypes<[...T, U]>();
    },
    getMapTypes(): {
      get<K extends keyof MergeTypes<T>>(key: K): MergeTypes<T>[K];
    } & Map<keyof MergeTypes<T>, MergeTypes<T>[keyof MergeTypes<T>]> {
      return null as any;
    },
    getTypes(): MergeTypes<T> {
      return null as any as MergeTypes<T>; // 类型转换，实际使用时不会返回 null
    },
  };
}

export function createPluginAccumulateTypes<T>(): AccumulateTypes<[T, PluginBase]> {
  return createAccumulateTypes<[T, PluginBase]>();
}

// 定义主类型，接受一个可选的泛型数组

// 创建 AccumulateTypes 实例的辅助函数
type omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
export type GetAccumulatedMapType<T> = T extends AccumulateTypes<infer U> ? ReturnType<T['getMapTypes']> : never;
export type GetAccumulatedType<T> = T extends AccumulateTypes<infer U> ? ReturnType<T['getTypes']> : never;

type add = {
  a: string;
};
type add2 = {
  b: number;
};
type add3 = {
  c: boolean;
  $deletePropsList: 'a' | 'b';
};
// 使用示例

const typeAccumulator = createAccumulateTypes<[add]>();
const withString = typeAccumulator.add<add2>();
const withStringAndNumber = withString.add<add3>();

// 获取累积的类型: string | number | boolean

type AccumulatedTypea = GetAccumulatedMapType<typeof withStringAndNumber>;
type AccumulatedTypea2 = GetAccumulatedType<typeof withStringAndNumber>;
function getType(params: omit<AccumulatedTypea2, AccumulatedTypea2['$deletePropsList']>) {
  // const f = params.b;
  const f = params.c;
  console.log(f);
}
function getMapType(params: AccumulatedTypea) {
  const f = params.get('c');
  console.log(f);
}
// const c: AccumulatedTypea = {};

// var f=c.get('a')
