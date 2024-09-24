import { orderBy, unionBy } from 'lodash';
import type { NaslComponentPluginOptions, PluginMap, PluginInitOptions } from './types';
import { getPropDefs, PropDef } from './utils';

export default class PluginManager {
  name: string = ''; // 组件名称

  valid: boolean = true;

  baseProps: PropDef[];

  basePropKeys: string[];

  allPropKeys: string[];

  plugins: NaslComponentPluginOptions[] = [];

  constructor({ name, componentOptions, plugin }: PluginInitOptions) {
    if (!componentOptions) {
      this.valid = false;
      return;
    }
    this.name = name || componentOptions.name;
    this.baseProps = getPropDefs(componentOptions);
    this.basePropKeys = this.baseProps.map((p) => p.name);
    this.setPlugin(plugin);
  }

  setPlugin(plugin: PluginMap) {
    const pluginArray = this.plugins.concat(Object.keys(plugin).map((name) => ({ order: 4, name, ...plugin[name] })));
    const sortPlugin = orderBy(pluginArray, ['order'], ['asc']);
    const unionPlugin = unionBy(sortPlugin, 'name');
    this.plugins = unionPlugin;
    this.allPropKeys = this.getPluginPropKeys(this.basePropKeys);
  }

  getPluginSetup = (isDesigner: boolean) => {
    const pluginSetups = this.plugins.filter((op) => {
      if (!op || typeof op.setup !== 'function') {
        return false;
      }

      if (!isDesigner && op.onlyUseIDE) {
        return false;
      }

      return true;
    }).map((op) => op.setup);
    return pluginSetups;
  };

  getPluginPropKeys = (propKeys: string[]) => {
    const keys = [...propKeys];
    const ps = this.plugins.map((op) => (op.props || [])).flat();

    ps.forEach((k) => {
      if (keys.indexOf(k) === -1) {
        keys.push(k);
      }
    });

    return keys;
  };
}
