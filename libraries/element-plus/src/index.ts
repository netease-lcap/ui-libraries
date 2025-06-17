import './styles';
import { type Plugin } from 'vue';
import _ from 'lodash';
import { install } from './install';

export * from './components';
export * from './install';

export default {
  install,
} as Plugin;
