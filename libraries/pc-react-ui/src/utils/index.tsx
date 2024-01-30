import _ from 'lodash';

function filterUnderfinedValue(object) {
  return Object.entries(object).reduce((pre, [key, value]) => (_.isUndefined(value) ? pre : _.assign(pre, { [key]: value })), {});
}
_.mixin({ filterUnderfinedValue });

declare module 'lodash' {
  interface LoDashStatic {
    filterUnderfinedValue: (object: any) => any;
  }
}
