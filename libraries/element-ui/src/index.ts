import Vue from 'vue';
import { install } from './main';

if (typeof window !== 'undefined') {
  install(Vue);
}
