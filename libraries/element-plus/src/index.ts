import { type Plugin } from 'vue';
import { install } from './install';
import 'element-plus/theme-chalk/base.css';

export * from './components';
export * from './install';

export default {
  install,
} as Plugin;
