import { orderBy, unionBy } from 'lodash';
import type { NaslComponentPluginOptions, PluginMap, PluginInitOptions } from './types';

export default class PluginManager {
  name: string = ''; // 组件名称

  plugins: NaslComponentPluginOptions[] = [];

  constructor({ name, plugin }: PluginInitOptions) {
    this.name = name;
    this.setPlugin(plugin);
  }

  setPlugin(plugin: PluginMap) {
    const pluginArray = this.plugins.concat(Object.keys(plugin).map((name) => ({ order: 4, name, ...plugin[name] })));
    const sortPlugin = orderBy(pluginArray, ['order'], ['asc']);
    const unionPlugin = unionBy(sortPlugin, 'name');
    this.plugins = unionPlugin;
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
