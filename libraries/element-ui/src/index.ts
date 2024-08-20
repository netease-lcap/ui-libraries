import * as VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';
import { install } from './main';

export * from './main';

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.VueCompositionAPI = VueCompositionAPI;
  install(Vue);
}
