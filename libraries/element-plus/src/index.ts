import './styles';
import { type Plugin } from 'vue';
import { install } from './install';

export * from './components';
export * from './install';
export * from './utils';
export default {
  install,
} as Plugin;
