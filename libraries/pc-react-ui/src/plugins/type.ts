import type { Map } from 'immutable';

export type hookType<T> = Array<
  (
    props: Map<keyof T, T[keyof T]>
  ) => Record<Partial<keyof typeof props>, (typeof props)[keyof typeof props]> |
    Record<string, string>
>;
export type pluginType<T> = {
  usePlugin: hookType<T>[] | Record<string, hookType<T>>;
};
