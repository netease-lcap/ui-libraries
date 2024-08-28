/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import type {
  Ref,
  ComputedRef,
  SetupContext,
} from '@vue/composition-api';
import type {
  ComponentOptions,
  CreateElement,
  VNode,
  VNodeData,
} from 'vue';
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

export interface PluginSetupRenderContext {
  propsData: VNodeData,
  props: VNodeData['props'],
  listeners: VNodeData['on'],
  scopedSlots: VNodeData['scopedSlots'],
  childrenNodes: VNode[],
}

export interface PluginSetupFunctionReturn {
  [key: string]: Ref<any> | ComputedRef<any> | any,
  [$deletePropList]?: string[];
  [$render]?: (resultVNode: VNode, h: CreateElement, context: PluginSetupRenderContext) => VNode;
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

export type PluginSetupFunction = (props: Readonly<MapGet>, ctx: PluginSetUpContext) => PluginSetupFunctionReturn | void;

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
  setup: PluginSetupFunction;

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
  componentOptions: ComponentOptions<any>;
  plugin: { [name: string]: NaslComponentPluginOptions };
}

export interface NaslComponentExtendInfo {
  /* 默认使用 ScopeSlots 向下透传， 原组件内容使用this.$slot.xxx 方式处理的需要配置名称，会转成$slots */
  slotNames?: string[];
  /* 配置对组件进行 on.native 监听的事件名称 */
  nativeEvents?: string[];
  /* 优先使用listeners， 例如属性中有onPageChange， 事件中有page-change,是，配置此项优先使用listeners, 否则使用props 向下传递 */
  eventNames?: string[];
  /* 代理组件提供的方法 */
  methodNames?: string[];
}
