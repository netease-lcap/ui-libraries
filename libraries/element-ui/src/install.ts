import VueCompositionAPI from '@vue/composition-api';
import Loading from 'element-ui/lib/loading';
import Message from 'element-ui/lib/message';
import * as Components from './components';
import * as ProComponents from './pro-components';

export const install = (Vue) => {
  Vue.use(VueCompositionAPI);
  Vue.prototype.$env = Vue.prototype.$env || {};
  Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  Object.keys(Components).forEach((key) => {
    Vue.component(Components[key].name, Components[key]);
  });

  Object.keys(ProComponents).forEach((key) => {
    Vue.component(key, ProComponents[key]);
  });

  Vue.use(Loading);
  Vue.directive('hoist-data-attribute', {
    inserted(el, binding) {
      const { topSelector } = binding.value;
      // eslint-disable-next-line no-underscore-dangle
      let _el = el.parentNode;
      do {
        if (!_el.matches) {
          return;
        }
        if (_el.matches(topSelector)) {
          break;
        }
        _el = _el.parentNode;
      } while (_el);

      Object.keys(binding.value).forEach((key) => {
        if (key.startsWith('data-')) {
          _el.setAttribute(key, binding.value[key]);
        }
      });
    },
  });
  Vue.directive('remove-data-attribute', {
    inserted(el) {
      const datasetKeys = Object.keys(el.dataset);
      // eslint-disable-next-line no-restricted-syntax
      for (const dataname of datasetKeys) {
        delete el.dataset[dataname];
      }
    },
  });
  Vue.prototype.$message = Message;
  Vue.prototype.$toast = {
    show: Message.info,
  };
};
