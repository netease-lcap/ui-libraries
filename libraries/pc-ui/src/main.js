import './theme/vars.css';
import './styles/base.css';
import './styles/theme.css';
import Vue from 'vue';
import * as directives from './directives';
import * as filters from './filters';
import * as utils from './utils';

export * from './components';
export * from './layouts';
export * from './assist';
export { directives, filters, utils };

export { install } from '@lcap/vue2-utils';
Vue.prototype.$env = Vue.prototype.$env || {};
Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
Vue.prototype.$at2 = function (obj, propertyPath) {
  if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
  return this.$at(obj, propertyPath);
};
