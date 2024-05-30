import Vue from 'vue';
import { installOptions } from '@lcap/vue2-utils';
import * as Vant from './main';

export * from './main';

if (typeof window !== 'undefined') {
  window.LCAPUILibrary = Vant;

  Vue.prototype.$env = Vue.prototype.$env || {};
  Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  Vue.prototype.$env = Vue.prototype.$env || {};
  Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  Vue.prototype.$at2 = function (obj, propertyPath) {
    if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
    return this.$at(obj, propertyPath);
  };

  installOptions(Vue);
  Vue.use(Vant);
}
