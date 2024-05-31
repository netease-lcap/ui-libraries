/* eslint-disable */
import at from 'lodash/at';

/**
 * 将 Components 数组转换为对象
 * @deprecated
 * @param {Array} Components - 组件数组
 */
export const mapComponents = (Components) => {
  const result = {};
  Components.forEach((Component) => {
    const name =
      typeof Component === 'function' ? Component.options.name : Component.name;
    name && (result[name] = Component);
  });
  return result;
};

/**
 * 在 Vue 中安装组件
 * @param {Object|Array} Components - 组件集合
 * @param {Vue} Vue
 */
export function installComponents(Vue, Components) {
  const caseRE = /^[A-Z]/;
  const blackList = [
    'directives',
    'filters',
    'utils',
    'mixins',
    'blocks',
    'vendors',
    'install',
    'default',
  ];

  // 组件之间有依赖，有 install 的必须先安装
  Object.keys(Components).forEach((key) => {
    if (!caseRE.test(key)) {
      // 如果为大写则是组件
      if (!blackList.includes(key))
        console.error('不允许组件名首字母小写', key, Components[key]);
      return;
    }

    const Component = Components[key];
    if (Component.install) {
      Vue.component(key, Component);
      Component.install(Vue, key);
    }
  });
  Object.keys(Components).forEach((key) => {
    if (!caseRE.test(key)) {
      // 如果为大写则是组件
      if (!blackList.includes(key))
        console.error('不允许组件名首字母小写', key, Components[key]);
      return;
    }

    const Component = Components[key];
    Vue.component(key, Component);
    if (!Component.install) {
      Vue.component(key, Component);
    }
  });
}

/**
 * 在 Vue 中安装指令
 * @param {Object} directives - 指令集合
 * @param {Vue} Vue - 全局的 Vue
 */
export function installDirectives(Vue, directives) {
  Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]));
}

/**
 * 在 Vue 中安装过滤器
 * @param {Object} filters - 过滤器集合
 * @param {Vue} Vue - 全局的 Vue
 */
export function installFilters(Vue, filters) {
  Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));
}

export const installValidators = function installValidators(Vue, validators) {
  Object.keys(validators).forEach((key) => {
    Vue.validator(key, validators[key]);
  });
};

export const installRules = function installRules(Vue, rules) {
  Object.keys(rules).forEach((key) => {
    Vue.rule(key, rules[key]);
  });
};

export function supportOverrideWatch(Vue) {
  const nativeWatch = {}.watch;

  function extend(to, _from) {
    for (const key in _from) {
      to[key] = _from[key];
    }
    return to;
  }

  const strategies = Vue.config.optionMergeStrategies;

  // Modify from https://github.com/vuejs/vue/blob/dev/src/core/util/options.js#L208
  strategies.watch = function (parentVal, childVal) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) parentVal = undefined;
    if (childVal === nativeWatch) childVal = undefined;
    /* istanbul ignore if */
    if (!childVal) return Object.create(parentVal || null);
    if (!parentVal) return childVal;
    const ret = {};
    extend(ret, parentVal);
    for (const key in childVal) {
      let parent = ret[key];
      const child = childVal[key];
      if (parent && !Array.isArray(parent)) parent = [parent];
      if (typeof child === 'object' && child.override) ret[key] = [child];
      else {
        if (parent) ret[key] = parent.concat(child);
        else ret[key] = Array.isArray(child) ? child : [child];
      }
    }
    return ret;
  };
}

export function installOptions(Vue) {
  // Compability i18n
  Vue.prototype.$t =
    Vue.prototype.$t ||
    function (key, data) {
      const message = this.$options.i18n.messages['zh-CN'][key];
      if (data) return message.replace(/{(.*?)}/g, (a, b) => data[b]);

      return message;
    };

  Vue.prototype.$at =
    Vue.prototype.$at ||
    function (obj, propertyPath) {
      if (propertyPath === undefined || propertyPath === null) {
        return undefined;
      } else return at(obj, [propertyPath])[0];
    };

  Vue.prototype.$setAt =
    Vue.prototype.$setAt ||
    function (obj, propertyPath, value) {
      const lastIndex = propertyPath.lastIndexOf('.');
      if (lastIndex === -1) return Vue.prototype.$set(obj, propertyPath, value);
      else {
        const prepath = propertyPath.slice(0, lastIndex);
        const subpath = propertyPath.slice(lastIndex + 1);
        return Vue.prototype.$set(
          Vue.prototype.$at(obj, prepath),
          subpath,
          value,
        );
      }
    };

  Vue.prototype.$deleteAt =
    Vue.prototype.$setAt ||
    function (obj, propertyPath) {
      const lastIndex = propertyPath.lastIndexOf('.');
      if (lastIndex === -1) return Vue.prototype.$delete(obj, propertyPath);
      else {
        const prepath = propertyPath.slice(0, lastIndex);
        const subpath = propertyPath.slice(lastIndex + 1);
        return Vue.prototype.$delete(Vue.prototype.$at(obj, prepath), subpath);
      }
    };

  // Support override supportOverrideWatch
  supportOverrideWatch(Vue);
}

/**
 * 在 Vue 中安装组件库
 * @param {Vue} Vue - 全局的 Vue
 * @param {Object} library - 包含组件，指令，过滤器
 */
export function install(Vue, library) {
  if (!library) library = this; // eslint-disable-line

  installOptions(Vue);
  installComponents(Vue, library);

  library.directives && installDirectives(Vue, library.directives);
  library.filters && installFilters(Vue, library.filters);
  library.validators && installValidators(Vue, library.validators);
  library.rules && installRules(Vue, library.rules);
}
