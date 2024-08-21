import * as VueCompositionAPI from '@vue/composition-api';
import * as LcapUI from '@lcap/pc-ui/src/index';
import * as ElementPro from '@lcap/element-pro/src/main';
import { install } from './main';

export * from './main';

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  // @ts-ignore
  window.VueCompositionAPI = VueCompositionAPI;
  window.Vue.use(LcapUI as any);
  install(window.Vue);
  window.Vue.use(ElementPro as any);
}
