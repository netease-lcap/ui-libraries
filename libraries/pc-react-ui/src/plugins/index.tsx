/* eslint-disable class-methods-use-this */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */

import { Map } from 'immutable';
import React from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
// import { useWhyDidYouUpdate } from 'ahooks';
import type { pluginType } from '@/plugins/type';
import { $deletePropsList } from '@/plugins/constants';

export class Plugin {
  plugin: any[] = [];

  private mapProps: Record<string, string> = {};

  displayName: string;

  globalPlugin = [];

  constructor(options: { displayName: string, mapProps: Record<string, string>, plugin }) {
    this.displayName = options.displayName;
    this.mapProps = options.mapProps || {};
    this.setPlugin(options.plugin);
  }

  handleRule = (plugin) => {
    const defaultOrderPlugin = _.map(plugin, (plugin) => _.defaults(plugin, { order: 4 }));
    const sortPlugin = _.orderBy(defaultOrderPlugin, ['order'], ['asc']);
    const unionPlugin = _.unionBy(sortPlugin, 'name');
    return unionPlugin;
  };

  setPlugin = (plugin) => {
    const handlePluginList = _.cond([
      [_.isArray, _.identity],
      [_.isObject, _.values],
      [_.stubTrue, _.stubArray],
    ]);

    this.plugin = this.handleRule(_.concat(this.plugin, handlePluginList(plugin)));
  };

  getPluginMethod = () => {
    const handlePlgunMethod = _.cond([
      [_.isFunction, _.identity],
      [_.flow([fp.get('method'), _.isFunction]), fp.get('method')],
      [_.stubTrue, _.noop],
    ]);
    const pluginMethod = _.map(this.plugin, handlePlgunMethod);
    return pluginMethod;
  };

  getMapProps = () => {
    return Map(this.mapProps);
  };
}

export function HocBaseComponents(
  BaseComponent,
  {
    props, plugin, ref,
  },
) {
  const pluginHooks = plugin.getPluginMethod();
  const mapProps = plugin.getMapProps();

  const ImmutableProps = Map(props)
    .reduce((result, value, key) => result.set(mapProps.get(key, key), value), Map())
    .set('render', BaseComponent)
    .set('ref', ref)
    .set('$deletePropsList', [])
    .set($deletePropsList, [1, 2]);

  const expandProps = pluginHooks.reduce(
    (expandProps, handleFun) => expandProps.merge(_.attempt(handleFun, expandProps)),
    ImmutableProps,
  );
  const Component = expandProps.get('render');
  const jsProps = expandProps.toJS();

  const excludeProps = _.omit(jsProps, _.concat(
    _.keys(plugin.getMapProps().toJS()),
    expandProps.get('$deletePropsList', []),
    ['$deletePropsList', 'render', 'usePlugin'],
  ));

  return (
    <Component
      {...excludeProps}
    />
  );
}
export function registerComponet<T, U extends pluginType<T>>(
  Component: React.ElementType,
  pluginOption,
) {
  return React.forwardRef<T, U>((props, ref) => {
    const [plugin, setPlugin] = React.useState(new Plugin(pluginOption));

    // React.useEffect(() => {
    //   if (props.appType === 'lowCode') {
    //     import('http://localhost:3030/app.js').then((_) => {
    //       plugin.setPlugin(_);
    //       setPlugin({ ...plugin });
    //     });
    //   }
    // }, [props.appType]);

    React.useEffect(() => {
      plugin.setPlugin(props.usePlugin);
      setPlugin({ ...plugin });
    }, [props.usePlugin]);

    return HocBaseComponents(Component, {
      props, plugin, ref,
    });
  });
}
