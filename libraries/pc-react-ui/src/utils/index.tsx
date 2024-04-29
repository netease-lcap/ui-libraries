import _ from 'lodash';
import dayjs from 'dayjs';

function filterUnderfinedValue(object: Record<string, string>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => !_.isUndefined(value)));
}
const selfAttempt = _.attempt;
const attempt = _.wrap(selfAttempt, (fn, ...arg) => {
  const result = fn(...arg);
  if (_.isError(result)) console.log(result);
  return result;
});

function isValidTime(time) {
  return !_.isNil(time) && dayjs(time).isValid();
}

function controllableValue(props) {
  const resultObj = {};
  const valueProps = props.has('value') ? { value: props.get('value') } : {};
  const onChangeProps = props.has('onChange') ? { onChange: props.get('onChange') } : {};
  _.assign(resultObj, valueProps);
  _.assign(resultObj, onChangeProps);
  return resultObj;
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
  filterUnderfinedValue, attempt, isValidLink, stringToAscii, isValidTime, controllableValue,
});
// _.mixin
declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
    attempt: typeof _.attempt
    isValidLink: typeof isValidLink
    stringToAscii: typeof stringToAscii
    isValidTime: typeof isValidTime
    controllableValue: typeof controllableValue
  }
}
