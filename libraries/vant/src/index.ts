import { type Plugin } from 'vue';
import { install } from './install';

export * from './components';
export * from './install';

export default {
  install,
} as Plugin;
