/* eslint-disable no-param-reassign */
import './styles/normalize.css';
import './styles/index.css';
import './styles/reset.css';
import Loading from 'element-ui/lib/loading';
import Message from 'element-ui/lib/message';
import * as components from './components';

// eslint-disable-next-line import/first
import 'virtual:theme.css';

export * from './components';

let installed = false;
export const install = (Vue) => {
  if (installed) {
    return;
  }

  installed = true;
  Vue.prototype.$env = Vue.prototype.$env || {};
  Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
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
