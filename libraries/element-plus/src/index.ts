import './styles';
import { type Plugin } from 'vue';
import { install } from './install';
// import mcpToolJson from '@/mcpTool.json';

export * from './components';
export * from './install';
export * from './utils';
export default {
  install,
} as Plugin;
