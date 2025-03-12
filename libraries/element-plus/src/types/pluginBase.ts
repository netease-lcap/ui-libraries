import type { Ref, VNode } from 'vue';
import { $deletePropsList } from '@/plugins/constants';

type ref = Ref;

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
};
