import Vue from 'vue';
import * as Vant from './main';

export * from './main';

if (typeof window !== 'undefined') {
  Vue.prototype.$env = Vue.prototype.$env || {};
  Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  Vue.prototype.$at2 = function (obj, propertyPath) {
    if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
    return this.$at(obj, propertyPath);
  };

  Vue.use(Vant);
  window.LcapUI = Vant;
}
