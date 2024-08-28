import type { CreateElement, VNode } from 'vue';
import {
  defineComponent,
  isRef,
  shallowRef,
  watch,
  inject,
  computed,
  Ref,
  ComputedRef,
  onBeforeUnmount,
  SetupContext,
} from '@vue/composition-api';
import { kebabCase } from 'lodash';
import PluginManager from './plugin';
import { MapGetKey, PluginSetupRef } from './types';
import {
  getPropKeys,
  getRefValueMap,
  splitPropsAndAttrs,
  splitListeners,
  mergeRef,
  normalizeArray,
  mergeArray,
  isEmptyVNodes,
  getEventKeys,
  isShallowEqualArray,
  isNullOrUndefined,
  getEventName,
} from './utils';
import { $deletePropList, $ref, $render } from './constants';

const eventRegex = /^on[A-Z].*/;
const slotRegex = /^slot[A-Z].*/;

export interface HocBaseRefMap {
  [key: string]: Ref<any> | ComputedRef<any> | any,
  [$deletePropList]: string[];
  [$render]: Array<any>;
  [$ref]: PluginSetupRef;
}

const useInitRefMap = (keys: any) => {
  const map: HocBaseRefMap = {
    [$ref]: {
      props: [],
    },
    [$deletePropList]: [],
    [$render]: [],
  };

  return map;
};

const useSetRefParent = (refMap: any, mapGet: any, $methodNames: string[], ctx: SetupContext) => {
  const refKeys: string[] = [];
  Object.keys(refMap[$ref]).forEach((key) => {
    if (key === 'props' && refMap[$ref].props) {
      refMap[$ref].props.forEach((prop: string) => {
        refKeys.push(prop);
        Object.defineProperty(ctx.parent, prop, {
          configurable: true,
          get() {
            return mapGet(refMap, prop);
          },
        });
      });
      return;
    }

    refKeys.push(key);
    Object.defineProperty(ctx.parent, key, {
      configurable: true,
      get() {
        return refMap[$ref][key];
      },
    });
  });

  $methodNames.forEach((key) => {
    if (refKeys.indexOf(key) !== -1) {
      return;
    }

    refKeys.push(key);
    Object.defineProperty(ctx.parent, key, {
      configurable: true,
      get() {
        if (!ctx.refs.$base) {
          return undefined;
        }

        return (ctx.refs.$base as any)[key];
      },
    });
  });

  onBeforeUnmount(() => {
    const map: any = {};
    refKeys.forEach((k) => {
      map[k] = {
        configurable: true,
        get: undefined,
      };
    });
    Object.defineProperties(ctx.parent, map);
  });
};

const usePropMap = (props: any, ctx: SetupContext) => {
  let setupEnded = false;
  const endRefMap: HocBaseRefMap = {
    [$ref]: {
      props: [],
    },
    [$deletePropList]: [],
    [$render]: [],
  };
  const getDefaultValue = (k: string) => {
    if (slotRegex.test(k)) {
      const slotName = kebabCase(k.substring(4));
      return ctx.slots[slotName];
    }

    if (eventRegex.test(k)) {
      const eventName = kebabCase(k.substring(2));
      return ctx.listeners[eventName];
    }

    if (k.indexOf(':') !== -1) {
      return ctx.listeners[k];
    }

    if (!isNullOrUndefined(ctx.attrs[k])) {
      return ctx.attrs[k];
    }

    return ctx.attrs[kebabCase(k)];
  };

  const mapGet = (map: any, key: MapGetKey) => {
    if (key === $ref) {
      return map[$ref];
    }

    if (key === $deletePropList) {
      return map[$deletePropList];
    }

    if (key === $render) {
      return map[$render];
    }

    const v = map[key];

    if (v === undefined) {
      return getDefaultValue(key);
    }

    if (isRef(v)) {
      return v.value;
    }

    return v;
  };

  const mapGetEnd = (key: MapGetKey) => {
    if (!setupEnded) {
      throw new Error('GetEnd not allowed to be used in setup runtime!');
    }
    return mapGet(endRefMap, key);
  };

  const useComputed = (map: Record<string, any>, dependPropKeys: string | string[], compute: (...args: any[]) => any = (v) => v) => {
    let oldValues: any[] = [];
    let oldResult: any = null;
    return computed(() => {
      const values = normalizeArray(dependPropKeys).map((k) => mapGet(map, k));
      if (isShallowEqualArray(oldValues, values)) {
        return oldResult;
      }

      const result = compute(...values);
      oldResult = result;
      oldValues = values;
      return result;
    });
  };

  const useMapGetRef = (map: Record<string, any>, dependPropKeys: string | string[], compute: (...args: any[]) => any = (v) => v) => {
    const propRef = shallowRef(null);
    const dependencies = computed(() => {
      return normalizeArray(dependPropKeys).map((k) => mapGet(map, k));
    });

    watch(dependencies, (values, oldValues) => {
      // 加一层浅比较防止重复执行，vue composition api 并不是真正的响应式，
      // 数据没变化也执行computed
      if (isShallowEqualArray(values, oldValues)) {
        return;
      }
      propRef.value = compute(...values);
    }, { immediate: true });
    return propRef;
  };

  const createPropsControl = (momentRefMap: any) => {
    return {
      get: (k: MapGetKey | MapGetKey[]) => {
        if (Array.isArray(k)) {
          return k.map((pkey) => mapGet(momentRefMap, pkey));
        }
        return mapGet(momentRefMap, k);
      },
      getEnd: (k: MapGetKey | MapGetKey[]) => {
        if (Array.isArray(k)) {
          return k.map((pkey) => mapGetEnd(pkey));
        }

        return mapGetEnd(k);
      },
      useComputed: (k: string | string[], compute = (v: any) => v) => useComputed(momentRefMap, k, compute),
      useRef: (k: string | string[], compute = (v: any) => v) => useMapGetRef(momentRefMap, k, compute),
    };
  };

  const callSetupEnd = (refMap: HocBaseRefMap) => {
    setupEnded = true;
    Object.assign(endRefMap, refMap);
    useSetRefParent(refMap, mapGet, props.$methodNames || [], ctx);
  };

  return {
    callSetupEnd,
    createPropsControl,
  };
};

function setMergeMapSymbol(mergeMap: any, momentRefMap: any) {
  mergeMap[$deletePropList] = mergeArray(momentRefMap[$deletePropList], mergeMap[$deletePropList] || []);

  if (mergeMap[$render] && typeof mergeMap[$render] === 'function') {
    mergeMap[$render] = momentRefMap[$render].concat([mergeMap[$render]]) as any;
  } else {
    delete mergeMap[$render];
  }

  if (mergeMap[$ref] && typeof mergeMap[$ref] === 'object') {
    const $toRef: PluginSetupRef = {
      ...momentRefMap[$ref],
      props: [...(momentRefMap[$ref].props || [])],
    };

    mergeRef($toRef, mergeMap[$ref]);
    mergeMap[$ref] = $toRef;
  }
}

function mergeRefMap(...refMaps: HocBaseRefMap[]) {
  const map: HocBaseRefMap = {
    [$ref]: {
      props: [],
    },
    [$deletePropList]: [],
    [$render]: [],
  };

  refMaps.forEach((refMap) => {
    Object.keys(refMap).forEach((k) => {
      map[k] = refMap[k];
    });

    if (refMap[$ref]) {
      map[$ref] = refMap[$ref];
    }

    if (refMap[$deletePropList]) {
      map[$deletePropList] = refMap[$deletePropList];
    }

    if (refMap[$render]) {
      map[$render] = refMap[$render];
    }
  });

  return map;
}

interface RenderStateContext {
  refMap: Record<MapGetKey, any>,
  keys: string[],
  eventNames: string[],
  propKeys: string[],
  baseComponent: any,
}

const toRenderState = ({
  refMap: map, keys,
  eventNames, propKeys,
  baseComponent,
}: RenderStateContext) => {
  const renderProps: any = {};
  const listeners: any = {};
  const renderSlots: any = {};

  Object.keys(map).forEach((k) => {
    const eventName = getEventName(k);
    if (eventName && eventNames.includes(eventName)) {
      listeners[eventName] = map[k];
    } else if (propKeys.indexOf(k) !== -1) {
      renderProps[k] = map[k];
    } else if (eventName) {
      listeners[eventName] = map[k];
    } else if (k.startsWith('update:')) {
      listeners[k] = map[k];
    } else if (slotRegex.test(k)) {
      const slotName = kebabCase(k.substring(4));
      renderSlots[slotName] = map[k];
    } else {
      renderProps[k] = map[k];
    }
  });

  return {
    props: renderProps,
    listeners,
    slots: renderSlots,
    deletePropsKeys: map[$deletePropList],
    allPropsKeys: keys,
    baseComponent,
    propKeys,
  };
};

export default defineComponent({
  name: 'HOCBase',
  inheritAttrs: false,
  props: {
    $plugin: {
      type: PluginManager,
      default: () => null,
    },
    $component: {
      default: () => {},
    },
    $slotNames: {
      type: Array,
      default: () => [] as string[],
    },
    $methodNames: {
      type: Array,
      default: () => [] as string[],
    },
    $eventNames: {
      type: Array,
      default: () => [] as string[],
    },
    $nativeEvents: {
      type: Array,
      default: () => ([] as string[]),
    },
  },
  setup(props, ctx) {
    const { $plugin: manger, $component: baseComponent } = props;
    // const compName = baseComponent.name;
    const propKeys = getPropKeys(typeof baseComponent === 'object' ? baseComponent : (baseComponent as any).options);
    const keys = manger.getPluginPropKeys(propKeys);
    const eventNames: string[] = (props.$eventNames || []) as string[];
    const vueInstance: any = ctx.root;
    const isDesigner = inject('VUE_APP_DESIGNER', false) || (vueInstance.$env && vueInstance.$env.VUE_APP_DESIGNER);
    let refMap = useInitRefMap(keys);
    const { callSetupEnd, createPropsControl } = usePropMap(props, ctx);
    const setups = manger.getPluginSetup(isDesigner);

    setups.forEach((setupFn) => {
      const momentRefMap = mergeRefMap(refMap);
      const mergeMap = setupFn.call(
        this,
        createPropsControl(momentRefMap),
        {
          h: vueInstance.$createElement,
          $router: vueInstance.$router,
          isDesigner,
          setupContext: ctx,
        },
      );

      if (!mergeMap) {
        return;
      }

      setMergeMapSymbol(mergeMap, momentRefMap);
      refMap = mergeRefMap(momentRefMap, mergeMap as any);
    });

    callSetupEnd(refMap);
    const renderFns: any[] = refMap[$render];

    return {
      $state: toRenderState({
        refMap,
        keys,
        baseComponent,
        propKeys,
        eventNames,
      }),
      $render(resultVNode: VNode, h: CreateElement, context: any) {
        if (renderFns.length === 0) {
          return resultVNode;
        }

        return renderFns.reduce(
          (value, renderFn = (v: any) => v) => renderFn.call(this, value, h, context),
          resultVNode,
        );
      },
    };
  },
  render(h) {
    if (!this.$state) {
      return null;
    }

    const {
      props,
      listeners,
      slots,
      deletePropsKeys,
      allPropsKeys,
      propKeys,
      baseComponent,
    } = this.$state;

    const scopedSlots: any = { ...this.$scopedSlots, ...getRefValueMap(slots) };

    const childrenNodes: VNode[] = [];
    (this.$slotNames as string[]).forEach((slotName) => {
      if (scopedSlots[slotName]) {
        let nodes = scopedSlots[slotName]({});

        if (Array.isArray(nodes)) {
          nodes = nodes.filter((n) => {
            if (typeof n === 'object') {
              return n.tag || (n.text && n.text.trim());
            }

            return true;
          });
        }
        delete scopedSlots[slotName];
        if (isEmptyVNodes(nodes)) {
          return;
        }

        childrenNodes.push(
          h('template', { slot: slotName }, normalizeArray(nodes)),
        );
      }
    });

    const refProps: any = { ...this.$attrs, ...getRefValueMap(props) };
    const refListeners = { ...this.$listeners, ...getRefValueMap(listeners) };

    Object.keys(refProps).forEach((key) => {
      if (!eventRegex.test(key)) {
        return;
      }

      const eventName = getEventName(key);

      if (eventName && refListeners[eventName]) {
        delete refListeners[eventName];
      }
    });

    const propsData = {
      ...splitPropsAndAttrs(refProps, propKeys, allPropsKeys, deletePropsKeys),
      ...splitListeners(refListeners, this.$nativeEvents as string[], getEventKeys(deletePropsKeys)),
      scopedSlots,
      ref: '$base',
    };

    const resultVNode = h(baseComponent, propsData, childrenNodes);

    return this.$render(resultVNode, h, {
      props: refProps,
      listeners: refListeners,
      scopedSlots,
      childrenNodes,
      propsData,
    });
  },
});
