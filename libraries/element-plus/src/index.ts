import { type Plugin } from 'vue';
import { install } from './install';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/dist/index.css';

export * from './components';
export * from './install';

export default {
  install,
} as Plugin;
