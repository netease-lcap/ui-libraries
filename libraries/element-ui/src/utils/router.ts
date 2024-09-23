import Vue from 'vue';

export const getRouteComponentOptions = (route) => {
  if (route.components.default) {
    // eslint-disable-next-line no-underscore-dangle
    const ctor = route.components.default._Ctor;
    let componentOptions: any;
    if (ctor && ctor[0]) {
      componentOptions = ctor[0].options;
    } else {
      componentOptions = (Vue.extend(route.components.default) as any).options;
    }
    return componentOptions;
  }

  return undefined;
};
