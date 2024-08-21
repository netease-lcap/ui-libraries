import * as Vant from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.prototype.$env = window.Vue.prototype.$env || {};
  window.Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  window.Vue.prototype.$env = window.Vue.prototype.$env || {};
  window.Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  window.Vue.prototype.$at2 = function (obj, propertyPath) {
    if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
    return this.$at(obj, propertyPath);
  };

  window.Vue.use(Vant);
  window.LcapUI = Vant;
}
