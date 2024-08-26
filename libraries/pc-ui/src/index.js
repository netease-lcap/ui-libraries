import {
  installDirectives,
  installComponents,
} from '@lcap/vue2-utils';
import * as CloudUI from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  installDirectives(window.Vue, CloudUI.directives);
  installComponents(window.Vue, CloudUI);

  window.Vue.mixin(CloudUI.MEmitter);
  window.Vue.mixin(CloudUI.MPubSub);

  window.LcapUI = CloudUI;
}
