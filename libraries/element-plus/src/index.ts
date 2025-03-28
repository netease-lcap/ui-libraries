import { type Plugin } from 'vue';
import { install } from './install';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/dist/index.css';
// eslint-disable-next-line import/first
import 'virtual:theme.css';

export * from './components';
export * from './install';

export default {
  install,
} as Plugin;
