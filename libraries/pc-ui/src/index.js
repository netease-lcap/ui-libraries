import {
  installDirectives,
  installComponents,
} from '@lcap/vue2-utils';
import * as CloudUI from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.prototype.$env = window.Vue.prototype.$env || {};
  window.Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  window.Vue.prototype.$at2 = function (obj, propertyPath) {
    if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
    return this.$at(obj, propertyPath);
  };

  installDirectives(window.Vue, CloudUI.directives);
  installComponents(window.Vue, CloudUI);

  window.Vue.mixin(CloudUI.MEmitter);
  window.Vue.mixin(CloudUI.MPubSub);

  window.LcapUI = CloudUI;
}
