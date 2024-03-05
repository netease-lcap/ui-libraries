/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable class-methods-use-this */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-shadow */

import { Map } from 'immutable';
import React from 'react';
import _ from 'lodash';
import fp from 'lodash/fp';
import { useWhyDidYouUpdate } from 'ahooks';
import { withErrorBoundary } from 'react-error-boundary';
import type { pluginType } from '@/plugins/type';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';

// try {
// } catch (error) {
// }

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

export const HocBaseComponents = React.forwardRef((myProps: any, ref) => {
  const { BaseComponent, props, plugin } = myProps;
  const baseRef = React.useRef({});
  const pluginHooks = plugin.getPluginMethod();
  const mapProps = plugin.getMapProps();
  function handleMutableProps(ref) {
    const obj = { ref, render: BaseComponent };
    return {
      setState: (state) => _.assign(obj, state),
      getState: (state) => obj[state],
      getObj: () => obj,
    };
  }
  const mutableProps = handleMutableProps(ref);
  const ImmutableProps = Map(props)
    .reduce((result, value, key) => result.set(mapProps.get(key, key), value), Map())
    .set('render', BaseComponent)
    .set('mutableProps', mutableProps)
    .set('ref', {})
    .set($deletePropsList, []);
  const expandProps = pluginHooks.reduce(
    (expandProps, handleFun) => expandProps.merge(_.attempt(handleFun, expandProps)),
    ImmutableProps,
  );
  const Component = expandProps.get('render');
  // const Component = mutableProps.getState('render');
  const jsProps = expandProps.toJS();
  const componentRef = jsProps.ref;
  const excludeProps = _.omit(jsProps, _.concat(
    _.keys(plugin.getMapProps().toJS()),
    expandProps.get($deletePropsList, []),
    [$deletePropsList, 'render', 'usePlugin', 'mutableProps', $deletePropsList, 'ref'],
  ));
  // useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...jsProps });

  // return <BaseComponent {...props} ref={ref} />;
  // console.log(mutableProps.getObj(), 'mutableProps');
  // const ComponentWithErrorBoundary = withErrorBoundary(Component, {
  //   fallback: <div>Something went wrong</div>,
  //   onError(error, info) {
  //     console.log(error, info, '组件出错啦----');
  //   },
  // });
  // console.log(mutableProps.getObj(), 'obj');
  // console.log(ref, 'pluginref');
  React.useImperativeHandle(ref, () => {
    return {
      ...componentRef,
      ...baseRef.current,
    };
  }, [componentRef, baseRef]);
  mutableProps.setState({ ref });
  // console.log(ref, 'ref');
  // console.log(excludeProps, 'excludeProps');
  // useWhyDidYouUpdate('name', excludeProps);
  return (
    <Component
      {...excludeProps}
      ref={baseRef}
    // {...mutableProps.getObj()}
    >
      {props.children}
    </Component>
  );
});
// extends pluginType<T>
// const ComponentWithErrorBoundary = withErrorBoundary(HocBaseComponents, {
//   fallback: <div>Something went wrong</div>,
//   onError(error, info) {
//     console.log(error, info, '组件出错啦----');
//   },
// });
export function registerComponet<T, U>(
  Component: React.ElementType,
  pluginOption,
) {
  return React.forwardRef<T, U>((props, ref) => {
    const [plugin, setPlugin] = React.useState(new Plugin(pluginOption));
    // console.count(pluginOption.displayName);
    // React.useEffect(() => {
    //   if (props.appType === 'lowCode') {
    //     import('http://localhost:3030/app.js').then((_) => {
    //       plugin.setPlugin(_);
    //       setPlugin({ ...plugin });
    //     });
    //   }
    // }, [props.appType]);

    // React.useEffect(() => {
    //   plugin.setPlugin(props.usePlugin);
    //   setPlugin({ ...(plugin as any) });
    //   console.log(plugin.plugin, 'plugin.plugin');
    // }, [props.usePlugin]);

    return <HocBaseComponents BaseComponent={Component} props={props} plugin={plugin} ref={ref} />;
  });
}
