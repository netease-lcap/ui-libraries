import _ from 'lodash';
import { onMounted, onUnmounted, ref, getCurrentInstance, type Ref } from 'vue';
import { PluginBase } from '@/types';

interface Hook {
  next: Hook;
  storeKey: symbol;
  isSetValue?: boolean;
  value?: any;
}

interface EffectHook {
  next: EffectHook;
  dep: any[];
  result: any;
  callBack?: any;
}

interface Options {
  defaultValue?: string | number | boolean;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
  onChange?: (...args: any[]) => void;
}
interface Fiber {
  workInProgressState: Hook;
  workInProgressEffect: EffectHook;
  updateQueen: Set<any>;
  getState: () => any;
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
      getState: () => ({}),
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

const getStateValue = _.cond([
  [_.isObject, (state) => state],
  [_.stubTrue, (state) => state],
]);
export function useState<T = any>(initialstate?: T): [T, (value: T | ((prevState: T) => T)) => void] {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();

  let hook: Hook;
  if (isMount) {
    hook = {
      next: null as any,
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
  const state = hook?.isSetValue ? currentFiber.getState().state[hook?.storeKey] : initialstate;
  const localSetValue = (value: T | ((prevState: T) => T)) => {
    // const state = currentFiber.getState().state[hook?.storeKey];
    hook.isSetValue = true;
    // TODO 判断是否相等
    // if (_.isEqual(value, state)) {
    //   return;
    // }
    const getValue = _.isFunction(value) ? value(getStateValue(state)) : value;
    currentFiber.updateQueen.add({ [hook.storeKey]: getValue });
    _.defer(() => {
      if (currentFiber.updateQueen.size) {
        const deleteQueue = Array.from(currentFiber.updateQueen);
        const comit = Array.from(currentFiber.updateQueen).reduce((pre, cur) => ({ ...pre, ...cur }), {});
        currentFiber.setValue(comit);
        deleteQueue.forEach((item) => currentFiber.updateQueen.delete(item));
      }
    }, currentFiber.updateQueen);
  };
  return [getStateValue(state), localSetValue];
}
export function useRef<T = any>(initialstate: T): Ref<T> {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook: Hook;
  if (isMount) {
    hook = {
      next: null as any,
      storeKey: Symbol('storeKey'),
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
export function useEffect(
  callBack: (...args: any[]) => (() => void) | void,
  dep: any[],
): void {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook: EffectHook;
  if (isMount) {
    hook = {
      next: null as any,
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
    onMounted(() => {
      const result = callBack(...dep);
      hook.result = result;
    });
    onUnmounted(() => {
      if (_.isFunction(hook.result)) {
        hook.result();
      }
    });
  } else {
    hook = currentFiber.workInProgressEffect.next;
    currentFiber.workInProgressEffect = currentFiber.workInProgressEffect.next;
    const isSameDep = _.every(dep, (item, index) => Object.is(item, _.get(hook, `dep.${index}`)));
    if (!_.isEmpty(dep) && !isSameDep) {
      const result = callBack(...dep);
      hook.result = result;
      hook.dep = dep;
    }
  }
}

export function useMemo<T>(callBack: () => T, dep: any[]): T {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook: EffectHook;
  if (isMount) {
    hook = {
      next: null as any,
      dep,
      result: null as T,
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
    const isSameDep = _.every(dep, (item, index) => _.isEqual(item, _.get(hook, `dep.${index}`)));
    if (!_.isEmpty(dep) && !isSameDep) {
      hook.result = callBack();
      hook.dep = dep;
    }
  }
  return hook.result;
}
export function useCallback<T extends (...args: any[]) => any>(callBack: T, dep: any[]): T {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook: EffectHook;
  if (isMount) {
    hook = {
      next: null as any,
      dep,
      result: null,
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

export function useControllableValue<T = any>(
  props: any,
  options: Options = {},
): [
  T,
  (...args: any[]) => void,
  {
    [key: string]: any;
  },
  boolean
] {
  const instance = useMemo(() => getCurrentInstance(), []);
  const { vnode } = instance || { vnode: { props: {} } };
  const emit = props.get('emit');
  const vProps = vnode.props || {};
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'modelValue',
    trigger = `onUpdate:${valuePropName}`,
    onChange: onChangeProps = () => {},
  } = options || {};
  const isControlled = Object.prototype.hasOwnProperty.call(vProps, valuePropName);
  const propsValue = props.get(valuePropName);
  const defaultValueProps = props.get(defaultValuePropName);
  // const initialValue = useMemo(() => {
  //   const controlledInitialValue = propsValue ?? defaultValueProps ?? defaultValue;
  //   const uncontrolledInitialValue = defaultValueProps ?? defaultValue;
  //   return isControlled ? controlledInitialValue : uncontrolledInitialValue;
  // }, [isControlled, propsValue, defaultValueProps, defaultValue]);
  const unControlledInitialValue = defaultValueProps ?? defaultValue;
  const [stateValue, setStateValue] = useState<T>(unControlledInitialValue);
  const triggerProps = props.get(trigger, () => {});
  const triggerPropsList = _.isArray(triggerProps) ? triggerProps : [triggerProps];

  const onChange = (...args: any[]) => {
    if (isControlled) {
      emit(trigger, ...args);
    } else {
      setStateValue(args[0] as T);
    }
    _.forEach(triggerPropsList, (item) => _.attempt(item, ...args));
    _.attempt(onChangeProps, ...args);
  };
  const value = isControlled ? propsValue : stateValue;

  return [
    value,
    onChange,
    {
      [valuePropName]: value,
      [trigger]: onChange,
    },
    isControlled,
  ];
}

const hookObject = {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
};
export function scheduler(pluginHooks, ImmutableProps, fiberMap) {
  const updateQueen = fiberMap.get('updateQueen');
  const getState = fiberMap.get('getState');
  const { setValue } = getState() as any;
  return pluginHooks?.reduce((ImmutableProps, handleFn) => {
    const isMount = !fiberMap.has(handleFn);
    const storeKey = _.uniqueId('storeKey');
    const fiber: Fiber = isMount
      ? {
          workInProgressState: null,
          workInProgressEffect: null,
          updateQueen,
          getState,
          setValue,
          storeKey,
        }
      : fiberMap.get(handleFn);
    fiberNode.setCurrentFiber(fiber, isMount);
    const result = _.attempt(_.bind(handleFn, _.assign(fiber, hookObject)), ImmutableProps);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GetAccumulatedMapType<T> = T extends AccumulateTypes<infer U> ? ReturnType<T['getMapTypes']> : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GetAccumulatedType<T> = T extends AccumulateTypes<infer U> ? ReturnType<T['getTypes']> : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type add = {
  a: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type add2 = {
  b: number;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type add3 = {
  c: boolean;
  $deletePropsList: 'a' | 'b';
};
// 使用示例

const typeAccumulator = createAccumulateTypes<[add]>();
const withString = typeAccumulator.add<add2>();
const withStringAndNumber = withString.add<add3>();

// 获取累积的类型: string | number | boolean

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AccumulatedTypea = GetAccumulatedMapType<typeof withStringAndNumber>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AccumulatedTypea2 = GetAccumulatedType<typeof withStringAndNumber>;
// function getType(params: omit<AccumulatedTypea2, AccumulatedTypea2['$deletePropsList']>) {
//   // const f = params.b;
//   const f = params.c;
//   console.log(f);
// }
// function getMapType(params: AccumulatedTypea) {
//   const f = params.get('c');
//   console.log(f);
// }
// const c: AccumulatedTypea = {};

// var f=c.get('a')

/**
 * 插件类型定义
 * 支持两种形式的插件：函数形式和对象形式
 */

// 定义插件函数类型，接受props参数并返回新的props
type PluginFunction<TProps, TReturn> = (props: TProps) => TReturn;

// 定义插件对象类型，包含处理函数和其他元数据
type PluginObject<TProps, TReturn> = {
  handle: (props: TProps) => TReturn;
  [key: string]: any; // 允许添加其他属性，如 name, version, metadata 等
};

// 定义插件类型，可以是函数或对象
type Plugin<TProps, TReturn> = PluginFunction<TProps, TReturn> | PluginObject<TProps, TReturn>;

/**
 * 插件累加器类型
 * 支持链式调用，自动推导props类型并累加返回值类型
 *
 * @template TAccumulatedProps 当前累积的所有props类型
 */
class PluginAccumulateTypes<TAccumulatedProps = Record<string, never>> {
  Plugin: Plugin<any, any>[] = [];

  /**
   * 添加插件（函数或对象形式）
   * @param plugin 插件函数或对象
   * @returns 新的插件累加器实例，包含累加后的类型
   */
  addPlugin<TReturn>(plugin: Plugin<TAccumulatedProps, TReturn>): PluginAccumulateTypes<TAccumulatedProps & TReturn> {
    this.Plugin.push(plugin);
    return this as any;
  }

  /**
   * 获取当前累积的所有类型
   * 主要用于类型推导，实际实现返回空对象
   */
  // eslint-disable-next-line class-methods-use-this
  getAccumulatedTypes(): TAccumulatedProps {
    return {} as TAccumulatedProps;
  }

  /**
   * 执行所有插件，返回最终的props
   * @param initialProps 初始props
   * @returns 执行所有插件后的最终props
   */
  execute(initialProps: any): TAccumulatedProps {
    return this.Plugin.reduce((props, plugin) => {
      // 判断插件是函数还是对象
      if (typeof plugin === 'function') {
        return { ...props, ...plugin(props) };
      }
      // 对象形式的插件，调用其 handle 方法
      return { ...props, ...plugin.handle(props) };
    }, initialProps) as TAccumulatedProps;
  }
}

// 使用示例
const pluginAccumulateTypes = new PluginAccumulateTypes<PluginBase>();
const a = pluginAccumulateTypes.addPlugin((props) => {
  // props 的类型是 PluginBase
  // 可以访问 props 的所有属性，如 props.ref, props.slots 等
  // 这里演示如何使用 props 参数
  const { ref } = props;
  return {
    b: 1,
    // 可以基于 props 计算返回值
    computedValue: ref.value ? 'has ref' : 'no ref',
  };
});
const b = a
  .addPlugin((props) => {
    // props 的类型是 PluginBase & { b: number; computedValue: string }
    // 可以访问 props.b, props.computedValue 以及 PluginBase 的所有属性
    return {
      c: 2,
      // 可以基于之前的插件返回值进行计算
      total: props.b + 10,
      aff: '234',
    };
  })
  .addPlugin((props) => {
    const f = props.aff;
  });
const c = b.addPlugin((props) => {
  // props 的类型是 PluginBase & { b: number; computedValue: string } & { c: number; total: number; aff: string }
  // 可以访问所有之前插件返回的属性
  return {
    d: 'hello',
    // 可以基于所有之前的返回值进行计算
    message: `${props.computedValue} - total: ${props.total}`,
  };
});
const d = c.addPlugin({
  handle: (props) => {
    // props 的类型是 PluginBase & { b: number; computedValue: string } & { c: number; total: number; aff: string } & { d: string; message: string }
    // 可以访问所有之前插件返回的属性
    return {
      e: 'world',
      // 可以基于所有之前的返回值进行计算
      finalMessage: `${props.message} - aff: ${props.aff}`,
    };
  },
  // 可以添加其他属性
  name: 'finalPlugin',
  version: '1.0.0',
});

// 最终的类型是 PluginBase & { b: number; computedValue: string } & { c: number; total: number; aff: string } & { d: string; message: string } & { e: string; finalMessage: string }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FinalType = typeof d extends PluginAccumulateTypes<infer U> ? U : never;

// 演示混合使用函数和对象形式的插件
const mixedExample = new PluginAccumulateTypes<PluginBase>();
const mixedA = mixedExample.addPlugin((props) => {
  // 函数形式插件
  // props 的类型是 PluginBase
  const { ref } = props;
  return { value1: 'from function', hasRef: !!ref };
});
const mixedB = mixedA.addPlugin({
  // 对象形式插件
  handle: (props) => {
    // props 包含 value1, hasRef 以及 PluginBase 的所有属性
    return { value2: 'from object', combined: `function: ${props.value1}` };
  },
  metadata: { author: 'developer' },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mixedC = mixedB.addPlugin((props) => {
  // 再次使用函数形式
  // props 包含 value1, hasRef, value2, combined 以及 PluginBase 的所有属性
  return { value3: 'final', allValues: [props.value1, props.value2, props.combined] };
});
