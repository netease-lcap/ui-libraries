import type { VNode } from 'vue';
import type { RouteLocationNormalized, Router } from 'vue-router';
import { $deletePropsList, $ide, $formTagName, $tagName, $route, $router } from '@/plugins/constants';

type ref = {
  [key: string]: any;
};

type slot = {
  default: () => any;
  [key: string]: () => any;
};

type deletePropsList = string[] | symbol[];

type provide = {
  [key: string]: any;
};

type inject = {
  [key: string]: any;
};

type emit = (event: string, ...args: any[]) => void;
type render = (...args: any[]) => VNode;

export type PluginBase = {
  ref: ref;
  slots: slot;
  [$deletePropsList]: deletePropsList;
  provide: provide;
  inject: inject;
  emit: emit;
  render: render;
  showInDesigner: boolean;
  [$route]: RouteLocationNormalized;
  [$router]: Router;
  style: Record<string, any>;
  class: string;
};

export type GetOptionsType<T> = T extends { new (options?: infer O): any } ? O : never;
export interface IIdePluginBase {
  ['data-nodepath']: string;
  ['vusion-d2c-id']: string;
  ['class']: string;
  [$formTagName]: string;

  [$tagName]: string;
}
export type RenderFunctionWithInheritAttrs = ((selfProps: any, context: { attrs: any,slots: any }) => VNode) & {
  inheritAttrs?: boolean;
};
