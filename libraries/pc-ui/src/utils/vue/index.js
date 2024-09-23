import Vue from 'vue';
import _ from 'lodash';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

export const getRouteComponentOptions = function (route) {
    if (route.components.default) {
        const ctor = route.components.default._Ctor;
        let componentOptions;
        if (ctor && ctor[0]) {
            componentOptions = ctor[0].options;
        } else {
            componentOptions = Vue.extend(route.components.default).options;
        }
        return componentOptions;
    }
};

export const memoizeFetch = _.memoize((url) => {
  return fetchPolyfill(url, {
    mode: 'cors',
    headers: {
      'Cache-Control': 'public, max-age=31536000', // 设置缓存控制头
    },
  })
    .then((result) => {
      return result.text();
    });
});
