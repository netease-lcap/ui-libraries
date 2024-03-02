import _ from 'lodash';

function filterUnderfinedValue(object: Record<string, string>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => !_.isUndefined(value)));
}
const selfAttempt = _.attempt;
const attempt = _.wrap(selfAttempt, (fn, ...arg) => {
  const result = fn(...arg);
  if (_.isError(result)) console.log(result);
  return result;
});

function isValidLink(link: string) {
  const pattern = /^(http(s)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  return pattern.test(link);
}
_.mixin({ filterUnderfinedValue, attempt, isValidLink });
// _.mixin
declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
    attemptLog: typeof _.attempt
    isValidLink: typeof isValidLink
  }
}
