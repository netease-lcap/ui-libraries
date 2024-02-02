import './styles/base.css';
import './styles/theme.css';
export * from './components';
export * from './layouts';
export * from './assist';

import * as directives from './directives';
import * as filters from './filters';
import * as utils from './utils';
export { directives, filters, utils };

export { install } from '@vusion/utils';

import Vue from 'vue';
Vue.prototype.$env = Vue.prototype.$env || {};
Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
Vue.prototype.$at2 = function (obj, propertyPath) {
    if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER)
        return obj;
    return this.$at(obj, propertyPath);
};
