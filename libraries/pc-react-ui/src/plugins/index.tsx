/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
import { Map } from 'immutable';
import isPlainObject from 'lodash/isPlainObject';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined';
import attempt from 'lodash/attempt';
import React from 'react';
import type { pluginType, hookType } from '@/plugins/type';

export class Plugin<T> {
  plugin: hookType<T>[] = [];

  basicsPlugin = [];

  localPlugin: hookType<T>[] = [];

  globalPlugin = [];

  constructor(plugin) {
    if (isArray(plugin)) this.plugin = plugin;
    else if (isObject(plugin)) this.plugin = Object.values(plugin);
  }

  setBasicsPlugin(basicsPlugin) {
    this.basicsPlugin = basicsPlugin;
  }

  setLocalPlugin(localPlugin: pluginType<T>['usePlugin'] = []) {
    if (isArray(localPlugin)) this.localPlugin = localPlugin as any;
    else if (isPlainObject(localPlugin)) this.localPlugin = Object.values(localPlugin);
  }

  setGlobalPlugin = (globalPlugin = []) => {
    this.globalPlugin = globalPlugin;
  };

  getPlugin() {
    console.log(this.plugin);
    return this.plugin.concat(this.basicsPlugin, this.localPlugin, this.globalPlugin);
  }
}
function HocComponet({
  props, plugins, ref, BaseComponent, mapProps,
}) {
  console.log(mapProps, 'mapProps333');
  const expandProps = plugins.reduce(
    (expandProps, handleFun) => expandProps.merge(attempt(handleFun, expandProps)),
    Map(props).set('mapProps', mapProps),
  );
  const excludeProps = expandProps.filter((x) => !isUndefined(x)).toJS();
  return (
    <BaseComponent
      ref={ref}
      {...excludeProps}
    />
  );
}
export function HocBaseComponents(
  BaseComponent,
  {
    props, plugins, ref, mapProps,
  },
) {
  return (
    <HocComponet
      props={props}
      plugins={plugins}
      ref={ref}
      mapProps={mapProps}
      BaseComponent={BaseComponent}
    />
  );
}
export function registerComponet<T, U extends pluginType<T>>(
  Component: React.ElementType,
  plugin,
  mapProps,
) {
  return React.forwardRef<T, U>((props, ref) => {
    plugin.setLocalPlugin(props?.usePlugin);
    const plugins = plugin.getPlugin();
    console.log(plugins, 'plugin---');
    return HocBaseComponents(Component, {
      props, plugins, ref, mapProps,
    });
  });
}
