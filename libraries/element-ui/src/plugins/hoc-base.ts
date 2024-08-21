import type { VNode } from 'vue';
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
import _, { kebabCase } from 'lodash';
import PluginManager, { MapGetKey, PluginSetupRef } from './plugin';
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

const useInitRefMap = (keys) => {
  const map: HocBaseRefMap = {
    [$ref]: {
      props: [],
    },
    [$deletePropList]: [],
    [$render]: [],
  };

  return map;
};

const useSetRefParent = (refMap, mapGet, $methodNames, ctx) => {
  const refKeys: string[] = [];
  Object.keys(refMap[$ref]).forEach((key) => {
    if (key === 'props' && refMap[$ref].props) {
      refMap[$ref].props.forEach((prop) => {
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

        return ctx.refs.$base[key];
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

const usePropMap = (props, ctx: SetupContext) => {
  let setupEnded = false;
  const endRefMap: HocBaseRefMap = {
    [$ref]: {
      props: [],
    },
    [$deletePropList]: [],
    [$render]: [],
  };
  const getDefaultValue = (k) => {
    if (slotRegex.test(k)) {
      const slotName = _.kebabCase(k.substring(4));
      return props.$_slots[slotName];
    }

    if (eventRegex.test(k)) {
      const eventName = _.kebabCase(k.substring(2));
      return ctx.listeners[eventName];
    }

    if (k.startsWith('update:')) {
      return ctx.listeners[k];
    }

    return isNullOrUndefined(ctx.attrs[k]) ? ctx.attrs[kebabCase(k)] : ctx.attrs[k];
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
    let oldResult = null;
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

  const createPropsControl = (momentRefMap) => {
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
      useComputed: (k: string | string[], compute = (v) => v) => useComputed(momentRefMap, k, compute),
      useRef: (k: string | string[], compute = (v) => v) => useMapGetRef(momentRefMap, k, compute),
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

function setMergeMapSymbol(mergeMap, momentRefMap) {
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

const toRenderState = (map: Record<MapGetKey, any>, keys: string[], baseComponent: any, propKeys: string[]) => {
  const renderProps: any = {};
  const listeners: any = {};
  const renderSlots: any = {};

  Object.keys(map).forEach((k) => {
    if (propKeys.indexOf(k) !== -1) {
      renderProps[k] = map[k];
    } else if (eventRegex.test(k)) {
      const eventName = _.kebabCase(k.substring(2));
      listeners[eventName] = map[k];
    } else if (k.startsWith('update:')) {
      listeners[k] = map[k];
    } else if (slotRegex.test(k)) {
      const slotName = _.kebabCase(k.substring(4));
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

export interface NaslComponentExtendInfo {
  slotNames?: string[];
  nativeEvents?: string[];
  methodNames?: string[];
}

export default defineComponent({
  name: 'HOCBase',
  inheritAttrs: false,
  props: {
    $plugin: {
      type: PluginManager,
      default: () => null,
    },
    $component: {
      type: Object,
      default: () => {},
    },
    $slotNames: {
      type: Array,
      default: () => [],
    },
    $methodNames: {
      type: Array,
      default: () => [],
    },
    $_slots: {
      type: Object,
      default: () => ({}),
    },
    $nativeEvents: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, ctx) {
    const { $plugin: manger, $component: baseComponent } = props;
    // const compName = baseComponent.name;
    const propKeys = getPropKeys(baseComponent);
    const keys = manger.getPluginPropKeys(propKeys);
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
      $state: toRenderState(refMap, keys, baseComponent, propKeys),
      $render(resultVNode, h, context) {
        if (renderFns.length === 0) {
          return resultVNode;
        }

        return renderFns.reduce(
          (value, renderFn = (v) => v) => renderFn.call(this, value, h, context),
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

    const resultVNode = h(baseComponent, {
      ...splitPropsAndAttrs(refProps, propKeys, allPropsKeys, deletePropsKeys),
      ...splitListeners(refListeners, this.$nativeEvents as string[], getEventKeys(deletePropsKeys)),
      scopedSlots,
      ref: '$base',
    }, childrenNodes);

    return this.$render(resultVNode, h, {
      props: refProps,
      listeners: refListeners,
      scopedSlots,
      childrenNodes,
    });
  },
});
