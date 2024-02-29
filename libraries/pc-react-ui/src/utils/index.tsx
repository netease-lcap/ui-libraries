import _ from 'lodash';

function filterUnderfinedValue(object: Record<string, string>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => !_.isUndefined(value)));
}
const selfAttempt = _.attempt;
// function attempt(...args) {
//   const result = selfAttempt(...args);
//   if (_.isError(result)) console.log(result);
//   return result;
// }
const attempt = _.wrap(selfAttempt, (fn, ...arg) => {
  const result = fn(...arg);
  if (_.isError(result)) console.log(result);
  return result;
});
_.mixin({ filterUnderfinedValue, attempt });
// _.mixin
declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
    attemptLog: typeof _.attempt
  }
}
