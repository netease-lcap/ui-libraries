/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { localizeRules, builtInValidators } from './dist';

/**
 * @example
 * import VueVusionValidator from 'VueVusionValidator';
 * Vue.use(VueVusionValidator);
 */
export default {
  install(Vue, options) {
    options = options || {};

    Vue.config.optionMergeStrategies.validators = Vue.config.optionMergeStrategies.directives;
    Vue.config.optionMergeStrategies.rules = Vue.config.optionMergeStrategies.directives;

    Vue.options.validators = Object.create(builtInValidators);
    // @TODO: 这里国际化是一次性的，还是要考虑一下怎么变活
    Vue.options.rules = Object.create(localizeRules(options.locale));

    Vue.validator = function (id, definition) {
      if (!definition) return Vue.options.validators[id];
      Vue.options.validators[id] = definition;
    };

    Vue.rule = function (id, definition) {
      if (!definition) return Vue.options.rules[id];
      Vue.options.rules[id] = definition;
    };
  },
};
