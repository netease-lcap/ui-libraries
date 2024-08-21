import * as VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';
import * as LcapUI from '@lcap/pc-ui/src/index';
import * as ElementPro from '@lcap/element-pro/src/main';
import { install } from './main';

export * from './main';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.VueCompositionAPI = VueCompositionAPI;
  Vue.use(LcapUI as any);
  install(Vue);
  Vue.use(ElementPro as any);
}
