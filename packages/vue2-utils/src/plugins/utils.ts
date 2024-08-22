/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import type { ComponentOptions, PropOptions } from 'vue';
import { isRef } from '@vue/composition-api';
import { camelCase, isPlainObject, kebabCase } from 'lodash';
import type { PluginSetupRef } from './types';

export interface PropDef extends PropOptions {
  name: string;
}

export function getPropDefs(component: ComponentOptions<Vue>, props: PropDef[] = []) {
  if (component.extends) {
    getPropDefs(component.extends as ComponentOptions<Vue>, props);
  }

  if (component.mixins && component.mixins.length > 0) {
    component.mixins.forEach((mixin: any) => {
      getPropDefs(mixin, props);
    });
  }

  if (Array.isArray(component.props)) {
    component.props.map((str) => ({ name: camelCase(str) })).forEach((op) => {
      const i = props.findIndex((p) => p.name === op.name);
      if (i === -1) {
        props.push(op);
      } else {
        props[i] = op;
      }
    });
  } else if (isPlainObject(component.props)) {
    for (const key in component.props) {
      const val = component.props[key];
      const name = camelCase(key);
      const def = (isPlainObject(val) ? val : { name, type: val }) as any;
      const i = props.findIndex((p) => p.name === name);
      if (i === -1) {
        props.push(def);
      } else {
        props[i] = def;
      }
    }
  }

  return props;
}

export function getPropKeys(component: ComponentOptions<Vue>) {
  const keys = Array.isArray(component.props) ? [...component.props] : Object.keys(component.props || {});

  if (component.extends) {
    const extendKeys = getPropKeys(component.extends as ComponentOptions<Vue>);
    extendKeys.forEach((k) => {
      if (keys.indexOf(k) === -1) {
        keys.push(k);
      }
    });
  }

  if (component.mixins && component.mixins.length > 0) {
    component.mixins.forEach((mixin: any) => {
      const mixinKeys = getPropKeys(mixin);
      mixinKeys.forEach((k) => {
        if (keys.indexOf(k) === -1) {
          keys.push(k);
        }
      });
    });
  }

  return keys;
}

const EVENT_PREFIX = 'on-';
const SLOT_PREFIX = 'slot-';

export function getSlotKey(name: string) {
  return camelCase(`slot-${name}`);
}

export function getEventKey(name: string) {
  if (name.indexOf(':') !== -1) {
    return name;
  }

  return camelCase(`${EVENT_PREFIX}${name}`);
}

export function getEventKeys(keys: string[]) {
  return keys.map((key) => kebabCase(key))
    .filter((key) => key.startsWith(EVENT_PREFIX))
    .map((key) => key.substring(EVENT_PREFIX.length));
}

export function getSlotKeys(keys: string[]) {
  return keys.map((key) => kebabCase(key))
    .filter((key) => key.startsWith(SLOT_PREFIX))
    .map((key) => key.substring(SLOT_PREFIX.length));
}

export function getRefValue(props: Record<string, any>, name: string) {
  const v = props[name];
  return isRef(v) ? v.value : v;
}

export function getRefValueMap(refMap: Record<string, any>) {
  const map: Record<string, any> = {};

  Object.keys(refMap).forEach((k) => {
    map[k] = getRefValue(refMap, k);
  });

  return map;
}

export function splitPropsAndAttrs(map: Record<string, any>, propsKeys: string[], allKeys: string[], deletePropsKeys: string[]) {
  const props: any = {};
  const attrs: any = {};
  let className = '';
  let style = {};

  Object.keys(map).forEach((k) => {
    if (deletePropsKeys.indexOf(k) !== -1) {
      return;
    }

    if (k === 'class') {
      className = map[k];
    } else if (k === 'style') {
      style = map[k];
    } else if (propsKeys.indexOf(k) !== -1) {
      props[k] = map[k];
    } else {
      attrs[k] = map[k];
    }
  });

  allKeys.forEach((k: string) => {
    delete attrs[k];
  });

  return {
    props,
    attrs,
    class: className,
    style,
  };
}

export function splitListeners(listeners: any, nativeEvents: string[], deleteEventKeys: string[]) {
  const on: any = {};
  const nativeOn: any = {};

  Object.keys(listeners).forEach((k) => {
    if (deleteEventKeys.indexOf(k) !== -1) {
      return;
    }

    if (nativeEvents.indexOf(k) === -1) {
      on[k] = listeners[k];
    } else {
      nativeOn[k] = listeners[k];
    }
  });

  return {
    on,
    nativeOn,
  };
}

export function mergeRef($toRef: any, ref: any) {
  Object.keys(ref).forEach((k) => {
    if (k === 'props') {
      ref.props?.forEach((key: string) => {
        if ($toRef.props.indexOf(key) === -1) {
          $toRef.props.push(key);
        }
      });
    } else {
      $toRef[k] = ref[k];
    }
  });
}

export function getProxyMap($toRef: PluginSetupRef, propMap: any) {
  const { props, ...methods } = $toRef;
  const proxyMap: any = {};
  if (props && props.length > 0) {
    props.forEach((name) => {
      proxyMap[name] = getRefValue(propMap, name);
    });
  }

  Object.keys(methods).forEach((methodName) => {
    proxyMap[methodName] = methods[methodName];
  });

  return proxyMap;
}

export function isNullOrUndefined(v: any) {
  return v === undefined || v === null;
}

export function normalizeArray<T>(arr: T | T[]) {
  if (isNullOrUndefined(arr)) {
    return [];
  }

  return Array.isArray(arr) ? arr : [arr];
}

export function mergeArray<T>(arr1: T[], arr2: T[]) {
  const arr = [...arr1];

  if (!arr2 || arr2.length === 0) {
    return arr;
  }

  arr2.forEach((v) => {
    if (arr.indexOf(v) === -1) {
      arr.push(v);
    }
  });

  return arr;
}

export const isEmptyVNodes = (vnodes: any) => {
  if (!vnodes || (Array.isArray(vnodes) && vnodes.length === 0)) {
    return true;
  }

  if (!Array.isArray(vnodes)) {
    return false;
  }

  const arr = vnodes.flat();

  return arr.filter((v) => !!v).length === 0;
};

export const isShallowEqualArray = (values: any[], oldValues: any[]) => {
  if (values.length !== oldValues.length) {
    return false;
  }

  const index = values.findIndex((v, i) => oldValues[i] !== v);

  if (index === -1) {
    return true;
  }

  return false;
};
