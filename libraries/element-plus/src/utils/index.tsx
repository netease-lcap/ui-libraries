import _ from 'lodash';
import dayjs from 'dayjs';
import { match } from 'ts-pattern';
import mcpJson from '@/mcpTool.json';

export const mcpToolJson = mcpJson;

export * from './dom';
export * from './curry';

function filterUnderfinedValue(object: Record<string, string>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => !_.isUndefined(value)));
}

const selfAttempt = _.attempt;
const attempt = _.wrap(selfAttempt, (fn, ...arg: [any, any]) => {
  if (_.isArray(arg[0])) {
    return arg[0].map((item) => fn(item, ...arg.slice(1)));
  }
  const result = fn(...arg);
  if (_.isError(result)) {
    console.error('components error', result);
  }
  return result;
});
const mergeRef = (ref) => {
  return (componentRef) => {
    Object.assign(ref, componentRef);
    return componentRef;
  };
};
const liveRef = (ref, proxyTarget) => {
  _.assign(ref, proxyTarget.value);
  return new Proxy(ref, {
    get(target, key, receiver) {
      if (Object.prototype.hasOwnProperty.call(target, key)) return Reflect.get(target, key, receiver);
      return proxyTarget.value?.[key as string];
    },
  });
};
const mergeClass = (class1: string, class2: string) => {
  return `${class1 ?? ''} ${class2 ?? ''}`.trim();
};

function isValidTime(time) {
  return !_.isNil(time) && dayjs(time).isValid();
}

function isValidLink(link: string) {
  const pattern = /^(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  return pattern.test(link);
}
function stringToAscii(str) {
  if (_.isNil(str)) return [];
  const asciiArray: Array<number> = [];
  for (let i = 0; i < str?.length; i += 1) {
    asciiArray.push(str.charCodeAt(i));
  }
  return asciiArray;
}

// 示例用法
_.mixin({
  filterUnderfinedValue,
  attempt,
  isValidLink,
  stringToAscii,
  isValidTime,
  mergeRef,
  mergeClass,
  match,
  liveRef,
});
// _.mixin
declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
    attempt: typeof _.attempt;
    isValidLink: typeof isValidLink;
    stringToAscii: typeof stringToAscii;
    isValidTime: typeof isValidTime;
    mergeRef: typeof mergeRef;
    mergeClass: typeof mergeClass;
    match: typeof match;
    liveRef: typeof liveRef;
  }
}

export function transformKeys(obj: Record<string, any>, lang): Record<string, any> {
  function recursiveTransform(inputObj: any): any {
    // 处理数组
    if (_.isArray(inputObj)) {
      return inputObj.map((item) => recursiveTransform(item));
    }

    // 处理普通对象
    if (_.isPlainObject(inputObj)) {
      return _.reduce(
        inputObj,
        (result, value, key) => {
          // 转换键名：将所有 _ 替换为 .
          const transformedKey = key.replace(/_/g, '.');
          // 递归处理值
          const transformedValue = recursiveTransform(value);
          _.set(result, transformedKey, transformedValue);
          return result;
        },
        {} as Record<string, any>,
      );
    }

    // 其他类型（字符串、数字、布尔值等）直接返回
    return inputObj;
  }

  const result = recursiveTransform(obj);
  return { el: result, name: _.toLower(lang) };
}
