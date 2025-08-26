import _ from 'lodash';
import dayjs from 'dayjs';

export * from './dom';

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
  }
}

export function transformKeys(obj: Record<string, any>): Record<string, any> {
  const result = _.reduce(
    obj,
    (result, value, key) => {
      const keys = _.includes(key, '_') ? key.replace('_', '.') : key;
      _.set(result, keys, value);
      return result;
    },
    {} as Record<string, any>,
  );
  return { el: result };
}
