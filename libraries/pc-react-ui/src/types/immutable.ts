import type { Map } from 'immutable';

export interface StateMap<T, F> extends Map<string, any> {
  get<K extends keyof (T & F), L>(
    key: K,

    defaultValue?: L
  ): (T & F)[K] extends undefined ? L : (T & F)[K];
}

export interface Immutable<T> {
  get<K extends keyof T>(name: K): T[K];
}
