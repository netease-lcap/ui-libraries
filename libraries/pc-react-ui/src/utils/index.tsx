import _ from 'lodash';

function filterUnderfinedValue(object: Record<string, string>) {
  return Object.fromEntries(Object.entries(object).filter(([, value]) => !_.isUndefined(value)));
}
_.mixin({ filterUnderfinedValue });

declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
  }
}
