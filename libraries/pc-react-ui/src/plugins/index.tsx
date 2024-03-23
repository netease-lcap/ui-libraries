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
import { withErrorBoundary } from 'react-error-boundary';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { $deletePropsList } from '@/plugins/constants';
import '@/utils/index';

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
    const obj = { ref, render: BaseComponent, children: props.children };
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
  const jsProps = expandProps.toJS();
  const componentRef = jsProps.ref;
  const { setRef } = _.defaults(jsProps, { setRef: (object, ref) => _.set(object, 'ref', ref) });
  const excludeProps = _.omit(jsProps, _.concat(
    _.keys(plugin.getMapProps().toJS()),
    expandProps.get($deletePropsList, []),
    [$deletePropsList, 'render', 'usePlugin', 'mutableProps', $deletePropsList, 'ref', 'setRef'],
  ));

  React.useImperativeHandle(ref, () => {
    return {
      ...componentRef,
      ...baseRef.current,
    };
  }, [componentRef, baseRef]);
  mutableProps.setState({ ref });
  // if (plugin.displayName === 'Tree') {
  //   console.log(BaseComponent === Component, Tree === Component, '???===', plugin.displayName);
  //   return (
  //     <Component
  //       {...excludeProps}
  //       ref={baseRef}
  //     >
  //       {props.children}
  //     </Component>
  //   );
  // }
  setRef(excludeProps, baseRef);
  // console.log(excludeProps, 'ex');
  return (
    <ConfigProvider locale={zhCN}>
      <Component
        {...excludeProps}
      // {...refObj}
      >
        {/* 修复radioPro 子组件透传的问题 */}
        {excludeProps.children}
      </Component>
    </ConfigProvider>
  );
});
const ComponentWithErrorBoundary = withErrorBoundary(HocBaseComponents, {
  fallback: <div>Something went wrong</div>,
  onError(error, info) {
    console.log(error, info, '组件出错啦----');
  },
});
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
    // }, [props.usePlugin]);

    return <ComponentWithErrorBoundary BaseComponent={Component} props={props} plugin={plugin} ref={ref} />;
  });
}
