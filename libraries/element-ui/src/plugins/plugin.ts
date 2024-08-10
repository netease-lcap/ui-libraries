import type { Ref, ComputedRef, SetupContext } from '@vue/composition-api';
import _ from 'lodash';
import type { CreateElement, VNode } from 'vue';
import { $deletePropList, $render, $ref } from './constants';

export declare type Slot = (...args: any[]) => VNode[];
declare type InternalSlots = {
    [name: string]: Slot | undefined;
};

export declare type Slots = Readonly<InternalSlots>;

export interface PluginSetUpContext {
  h: CreateElement;
  isDesigner: boolean;
  $router: any;
  setupContext: SetupContext;
}

export interface PluginSetupRef {
  props?: string[];
  [key: string]: any;
}

export interface PluginSetupFunctionReturn {
  [key: string]: Ref<any> | ComputedRef<any> | any,
  [$deletePropList]?: string[];
  [$render]?: (resultVNode: VNode, h: CreateElement, context: any) => VNode;
  [$ref]?: PluginSetupRef;
}

export type MapGetKey = string | typeof $ref | typeof $render | typeof $deletePropList;
export interface MapGet {
  get<T extends any>(key: MapGetKey): T;
  get<T extends any[]>(key: Array<MapGetKey>): T;
  getEnd<T extends any>(key: MapGetKey): T;
  getEnd<T extends any[]>(key: Array<MapGetKey>): T;
  useRef<T>(prop: string, compute?: (v: any) => T): Ref<T>;
  useRef<T>(prop: string[], compute?: (...v: any[]) => T): Ref<T>;
  useComputed<T>(prop: string, compute?: (v: any) => T): ComputedRef<T>;
  useComputed<T>(prop: string[], compute?: (...v: any[]) => T): ComputedRef<T>;
}

export type PluginSetupFunction<K, V> = (props: Readonly<MapGet>, ctx: PluginSetUpContext) => PluginSetupFunctionReturn | void;


export interface NaslComponentPluginOptions {
  /**
   * 插件名称，默认使用 export 的名称
   */
  name?: string;
  /**
   * 扩展组件参数名称
   */
  props?: string[];
  /**
   * vue composition setup 执行是函数，用户监听数据变化，
   */
  setup: PluginSetupFunction<string, any>;

  /**
   * 插件排序，默认 4, 越小越先执行
   * 排序规范， 扩展参数 建议order 设置为 2或 3，修改 slot或者 render 等， 建议设置 7 - 9
   */
  order?: number;
  /**
   * 是否仅在ide中运行
   */
  onlyUseIDE?: boolean;
}

export type PluginMap = { [name: string]: NaslComponentPluginOptions };

export interface PluginInitOptions {
  name: string;
  plugin: { [name: string]: NaslComponentPluginOptions };
}

export default class PluginManager {
  name: string = ''; // 组件名称

  plugins: NaslComponentPluginOptions[] = [];

  constructor({ name, plugin }: PluginInitOptions) {
    this.name = name;
    this.setPlugin(plugin);
  }

  setPlugin(plugin: PluginMap) {
    const pluginArray = this.plugins.concat(Object.keys(plugin).map((name) => ({ order: 4, name, ...plugin[name] })));
    const sortPlugin = _.orderBy(pluginArray, ['order'], ['asc']);
    const unionPlugin = _.unionBy(sortPlugin, 'name');
    this.plugins = unionPlugin;
  }

  getPluginSetup = (isDesigner) => {
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
