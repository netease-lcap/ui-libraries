import './theme/vars.css';
import './styles/base.css';
import './styles/theme.css';
import Vue from 'vue';
import * as directives from './directives';
import * as filters from './filters';
import * as utils from './utils';

export * from './components';
export * from './layouts';
export * from './assist';
export { directives, filters, utils };

export { install } from '@lcap/vue2-utils';
