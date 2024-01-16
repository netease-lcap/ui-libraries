/* eslint-disable class-methods-use-this */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */
import { Map } from 'immutable';
import React from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import type { pluginType } from '@/plugins/type';

export class Plugin<T> {
  plugin: any[] = [];

  private mapProps: Record<string, string> = {};

  displayName: string;

  globalPlugin = [];

  constructor(plugin: T, options: { displayName: string, mapProps: Record<string, string> }) {
    this.displayName = options.displayName;
    this.mapProps = options.mapProps || {};
    this.setPlugin(plugin);
  }

  handleRule(plugin) {
    const defaultOrderPlugin = plugin.map((plugin) => _.defaults(plugin, { order: 4 }));
    const sortPlugin = _.orderBy(defaultOrderPlugin, ['order'], ['asc']);
    const unionPlugin = _.unionBy(sortPlugin, 'name');
    return unionPlugin;
  }

  setPlugin(plugin) {
    const resultPluginList = _.cond([
      [_.isArray, _.identity],
      [_.isObject, _.values],
      [_.stubTrue, _.constant([])],
    ]);

    const pluginList = _.concat(this.plugin, resultPluginList(plugin));
    this.plugin = this.handleRule(pluginList);
  }

  getPlugin() {
    const handlePlgunHook = _.cond([
      [_.isFunction, _.identity],
      [_.flow([fp.get('method'), _.isFunction]), fp.get('method')],
      [_.stubTrue, _.noop],
    ]);
    const pluginHook = _.map(this.plugin, handlePlgunHook);
    return pluginHook;
  }

  getMapProps() {
    return Map(this.mapProps);
  }
}

export function HocBaseComponents(
  BaseComponent,
  {
    props, plugin, ref,
  },
) {
  const pluginHooks = plugin.getPlugin();
  const mapProps = plugin.getMapProps();

  const ImmutableProps = Map(props)
    .reduce((result, value, key) => result.set(mapProps.get(key, key), value), Map());

  const expandProps = pluginHooks.reduce(
    (expandProps, handleFun) => expandProps.merge(_.attempt(handleFun, expandProps)),
    ImmutableProps,
  );

  const excludeProps = expandProps
    .deleteIn(_.keys(plugin.getMapProps().toJS()))
    .deleteIn(expandProps.get('$deletePropsList', ['']))
    .delete('$deletePropsList')
    .toJS();
  return (
    <BaseComponent
      ref={ref}
      {...excludeProps}
    />
  );
}
export function registerComponet<T, U extends pluginType<T>>(
  Component: React.ElementType,
  plugin,
) {
  return React.forwardRef<T, U>((props, ref) => {
    React.useEffect(() => {
      plugin.setPlugin(props?.usePlugin);
    }, [props?.usePlugin]);

    return HocBaseComponents(Component, {
      props, plugin, ref,
    });
  });
}
