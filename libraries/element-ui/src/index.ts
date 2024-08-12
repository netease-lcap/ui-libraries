import Vue from 'vue';
import { install } from './main';

export * from './main';

if (typeof window !== 'undefined') {
  install(Vue);
}
