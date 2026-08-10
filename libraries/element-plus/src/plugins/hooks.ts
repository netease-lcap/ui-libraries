import _ from 'lodash';
import { onMounted, onUnmounted, ref, getCurrentInstance, type Ref, inject, watch } from 'vue';
import { PluginBase, RenderFunctionWithInheritAttrs } from '@/types';
import { componentLog } from '@/utils/curry';
import { $provide } from '@/plugins/constants';
import type { ImmutableMap } from '@/plugins/accumulate';
// import { RenderFunctionWithInheritAttrs } from '@/types/pluginBase';

const searchParamsStr = window.location.search; // 结果："?name=Alice&age=25&hobby=reading&hobby=hiking"
const params = new URLSearchParams(searchParamsStr);
const compDebugId = params.get('compDebugId'); // 单值参数："Alice"

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

interface ControllableValueOptions<T = any, ValuePropName extends string = string> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: ValuePropName;
  trigger?: string;
  onChange?: (...args: any[]) => void;
  onValueEffect?: (...args: any[]) => void;
  beforeChange?: (...args: any[]) => boolean;
  afterChange?: (...args: any[]) => void;
}

/** 从 ImmutableMap 中提取 props 结构；非 ImmutableMap 时回退为 any */
type ExtractMapProps<M> = M extends ImmutableMap<infer P> ? P : M extends { toJS(): infer P } ? P : any;

/** 从 props 类型中取 valuePropName 对应字段类型 */
type ControllableValueType<P, ValuePropName extends string> = ValuePropName extends keyof P ? P[ValuePropName] : any;

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
    if (!currentFiber) return;
    const state = hook?.isSetValue ? currentFiber?.getState?.()?.state?.[hook?.storeKey] : initialstate;
    hook.isSetValue = true;
    // TODO 判断是否相等
    // if (_.isEqual(value, state)) {
    //   return;
    // }
    const getValue = _.isFunction(value) ? value(getStateValue(state)) : value;
    currentFiber?.updateQueen?.add({ [hook.storeKey]: getValue });
    _.defer(() => {
      if (currentFiber?.updateQueen?.size) {
        const deleteQueue = Array.from(currentFiber.updateQueen);
        const comit = Array.from(currentFiber.updateQueen).reduce((pre, cur) => ({ ...pre, ...cur }), {});
        currentFiber.setValue(comit);
        deleteQueue.forEach((item) => currentFiber.updateQueen.delete(item));
      }
    }, currentFiber.updateQueen);
  };
  return [getStateValue(state), localSetValue];
}
export function useRef<T = any>(initialstate: T, isRef: boolean = true): Ref<T> {
  const currentFiber = fiberNode.getCurrentFiber();
  const isMount = fiberNode.getIsMount();
  let hook: Hook;
  if (isMount) {
    hook = {
      next: null as any,
      storeKey: Symbol('storeKey'),
      value: isRef ? ref(initialstate) : { value: initialstate },
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
export function useEffect(callBack: (...args: any[]) => (() => void) | void, dep: any[]): void {
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
    const isSameDep = _.every(dep, (item, index) => _.isEqual(item, _.get(hook, `dep.${index}`)));
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
export function useCallback<T extends(...args: any[]) => any>(callBack: T, dep: any[]): T {
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
export function useRender(
  callBack: (props: any, { attrs, slots }: { attrs: any; slots: any }) => any,
  dep: any[],
  inheritAttrs: boolean = false,
): RenderFunctionWithInheritAttrs {
  const render = useCallback(callBack, dep) as RenderFunctionWithInheritAttrs;
  render.inheritAttrs = inheritAttrs;
  return render;
}
export function useSyncState(props: any, name: string) {
  const emit = props.get('emit');
  const value = props.get(name);
  useEffect(() => {
    emit('sync:state', name, value);
  }, [value]);
  return value;
}

/**
 * 受控 / 非受控值 Hook。
 * 返回值类型自动推导为 props（ImmutableMap）中 `valuePropName`（默认 `modelValue`）对应字段的类型。
 */
export function useControllableValue<
  M extends { get(
key: any, ...args: any[]): any },
  ValuePropName extends string = 'modelValue',
  P = ExtractMapProps<M>,
>(
  props: M,
  options: ControllableValueOptions<ControllableValueType<P, ValuePropName>, ValuePropName> = {},
): [
  ControllableValueType<P, ValuePropName>,
  (...args: any[]) => void,
  {
    [key: string]: any;
  },
  boolean,
] {
  type ValueType = ControllableValueType<P, ValuePropName>;
  const instance = useMemo(() => getCurrentInstance(), []);
  const { vnode } = instance || { vnode: { props: {} } };
  const emit = props.get('emit');
  const vProps = vnode.props || {};
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'modelValue' as ValuePropName,
    trigger = `onUpdate:${valuePropName}`,
    onChange: onChangeProps = () => {},
    onValueEffect = () => {},
  } = options || {};
  const isControlled = Object.prototype.hasOwnProperty.call(vProps, valuePropName);
  const priorValue = useRef<any>({});
  const propsValue = props.get(valuePropName) as ValueType;
  const defaultValueProps = props.get(defaultValuePropName);
  const unControlledInitialValue = (defaultValueProps ?? defaultValue) as ValueType;
  const [stateValue, setStateValue] = useState<ValueType>(unControlledInitialValue);
  const triggerProps = props.get(trigger) || (() => {});
  const triggerPropsList = _.isArray(triggerProps) ? triggerProps : [triggerProps];
  useEffect(() => {
    if (!_.isEqual(priorValue.value, propsValue) && isControlled) {
      onValueEffect(propsValue);
      priorValue.value = _.cloneDeep(propsValue);
    }
  }, [_.cloneDeep(propsValue), isControlled]);
  const onChange = (...args: any[]) => {
    if (_.isFunction(options?.beforeChange) && !options?.beforeChange?.(...args)) {
      return;
    }
    if (isControlled) {
      emit(trigger, ...args);
    } else {
      setStateValue(args[0] as ValueType);
    }
    emit('sync:state', valuePropName, ...args);
    priorValue.value = _.cloneDeep(_.get(args, 0, null));
    _.forEach(triggerPropsList, (item) => _.attempt(item, ...args));
    _.attempt(onChangeProps, ...args);
    options?.afterChange?.(...args);
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

// export function useInject(key: string) {
//   const injectValue = inject($provide);
//   const injectRef = ref(injectValue[key]);
//   watch(injectValue, (value: any) => {
//     console.log(value, 'value');
//   });
// }
const hookMap = {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
};

export function scheduler(pluginHooks, ImmutableState, ImmutableProps, fiberMap) {
  const updateQueen = fiberMap.get('updateQueen');
  const getState = fiberMap.get('getState');
  const { setValue } = getState() as any;
  if (ImmutableState?.get?.('data-ref-id') === compDebugId) {
    console.group('scheduler');
  }
  return pluginHooks?.reduce((ImmutableState, pluginHook) => {
    const handleFn = _.isFunction(pluginHook) ? pluginHook : pluginHook.handle;
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
    const result = _.attempt(_.bind(handleFn, _.assign(fiber, hookMap)), ImmutableState, ImmutableProps);
    fiberMap.set(handleFn, fiber);
    componentLog(compDebugId, handleFn, ImmutableState, result);
    return ImmutableState.merge(result);
  }, ImmutableState);
}
