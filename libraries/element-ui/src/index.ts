import Vue from 'vue';
import * as VueCompositionAPI from '@vue/composition-api';
// import * as LcapUI from '@lcap/pc-ui/src/index';
import * as ElementPro from '@lcap/element-pro/src/main';
import { install } from './main';
import './styles/reset-pro.css';

export * from './main';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.VueCompositionAPI = VueCompositionAPI;
  // window.Vue.use(LcapUI as any);
  install(Vue);
  Vue.use(ElementPro as any);
}
